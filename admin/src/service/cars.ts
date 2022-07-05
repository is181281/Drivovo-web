import firebase from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { Car, CreateCarDTO, UpdateCarDTO } from "../types";

class CarsService {
  cars: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;

  constructor() {
    this.cars = firebase.firestore().collection("Cars");
  }

  async fetchCarsList(): Promise<Car[]> {
    const snapshot = await this.cars.orderBy("priority", "asc").get();
    const result = snapshot.docs.map((doc) => doc.data());
    return result as Car[];
  }

  async updateCarImage(
    id: string,
    file: File,
    mainImage: boolean
  ): Promise<Car> {
    const newLink = await this.uploadCarImage(id, file, mainImage);

    if (mainImage) {
      await this.cars.doc(id).update({ image: newLink });
    } else {
      await this.cars.doc(id).update({ imageInnovation: newLink });
    }

    const updatedCar = await this.cars.where("id", "==", id).get();

    const result = updatedCar.docs[0].data() as Car;

    return result;
  }

  async uploadCarImage(
    id: string,
    file: File,
    mainImage: boolean
  ): Promise<string> {
    const fileBuffer = await file.arrayBuffer();
    const fileExtention = file.name.split(".").pop();
    const fileName = `cars/${id}/${
      mainImage ? id : `${id}_innovation`
    }.${fileExtention}`;
    const metadata = {
      contentType: fileExtention === "png" ? "image/png" : "image/jpeg",
    };

    const storage = firebase.storage();
    const storageRef = ref(storage, fileName);

    const uploadResult = await uploadBytes(storageRef, fileBuffer, metadata);

    const newLink = await getDownloadURL(uploadResult.ref);

    return newLink;
  }

  async updateCarParameters(updateParameters: UpdateCarDTO): Promise<Car> {
    const priceForFacebook = parseInt(
      updateParameters.price.replace("$", "").replace(",", "").trim(),
      10
    );
    await this.cars
      .doc(updateParameters.id)
      .update({ ...updateParameters, priceForFacebook });

    const updatedCar = await this.cars
      .where("id", "==", updateParameters.id)
      .get();

    const result = updatedCar.docs[0].data() as Car;

    return result;
  }

  async createNewCar(createParameters: CreateCarDTO): Promise<Car> {
    const cars = await this.cars.get();
    const priority = cars.docs.length + 1;
    const priceForFacebook = parseInt(
      createParameters.price.replace("$", "").replace(",", "").trim(),
      10
    );
    await this.cars
      .doc(createParameters.id)
      .set({ ...createParameters, priority, priceForFacebook });

    const newCar = await this.cars.where("id", "==", createParameters.id).get();
    const result = newCar.docs[0].data() as Car;

    return result;
  }

  async updateCarListPriority(carList: Car[]): Promise<Car[]> {
    await Promise.all(
      carList.map((car) =>
        this.cars.doc(car.id).update({
          priority: car.priority,
        })
      )
    );

    const updatedCarList = await this.fetchCarsList();

    return updatedCarList;
  }

  async isCarExists(id: string): Promise<boolean> {
    const car = await this.cars.where("id", "==", id).get();

    return !!car.docs.length;
  }

  async deleteCar(id: string): Promise<void> {
    const car = await this.cars.where("id", "==", id).get();
    if (!car) {
      throw new Error(`Автомобіль з id=${id} не знайдено`);
    }

    const storageRef = firebase.storage().ref(`cars/${id}`);
    const fileList = await storageRef.listAll();
    await Promise.all(fileList.items.map((item) => item.delete()));

    const batch = firebase.firestore().batch();

    car.forEach((doc) => batch.delete(doc.ref));

    await batch.commit();
  }
}

export default new CarsService();
