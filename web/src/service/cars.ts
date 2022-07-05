import firebase from "../firebase";
import { Car } from "../types";

class CarsService {
  cars: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;

  constructor() {
    this.cars = firebase.firestore().collection("Cars");
  }

  async fetchCarsList(): Promise<Array<Car>> {
    const snapshot = await this.cars.orderBy("priority", "asc").get();
    const result = snapshot.docs.map((doc) => doc.data());
    return result as Car[];
  }
}

export default new CarsService();
