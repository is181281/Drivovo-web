import { createAsyncThunk } from "@reduxjs/toolkit";

import carsService from "../../service/cars";
import { Car, CreateCarDTO, UpdateCarDTO } from "../../types";

export const getCarsList = createAsyncThunk<
  Car[],
  void,
  { rejectValue: string }
>("cars/getCarsList", async (_, { rejectWithValue }) => {
  try {
    const carsList = await carsService.fetchCarsList();
    return carsList;
  } catch (e: any) {
    return rejectWithValue(e);
  }
});

export const updateCarImage = createAsyncThunk<
  Car,
  { id: string; file: File; mainImage: boolean },
  { rejectValue: string }
>(
  "cars/updateCarImage",
  async (
    { id, file, mainImage }: { id: string; file: File; mainImage: boolean },
    { rejectWithValue }
  ) => {
    try {
      const updatedCar = await carsService.updateCarImage(id, file, mainImage);

      return updatedCar;
    } catch (e: any) {
      return rejectWithValue(e.error.message);
    }
  }
);

export const updateCarParameters = createAsyncThunk<
  Car,
  UpdateCarDTO,
  { rejectValue: string }
>(
  "cars/updateCarParameters",
  async (updateParameters: UpdateCarDTO, { rejectWithValue }) => {
    try {
      const updatedCar = await carsService.updateCarParameters(
        updateParameters
      );

      return updatedCar;
    } catch (e: any) {
      return rejectWithValue(e.error.message);
    }
  }
);

export const updateCarListPriority = createAsyncThunk<
  Car[],
  Car[],
  { rejectValue: string }
>("cars/updateCarListPriority", async (carList: Car[], { rejectWithValue }) => {
  try {
    const updatedCarList = await carsService.updateCarListPriority(carList);

    return updatedCarList;
  } catch (e: any) {
    return rejectWithValue(e.error.message);
  }
});

export const createNewCar = createAsyncThunk<
  Car,
  {
    carParameters: CreateCarDTO;
    imageFile: File | null;
    innovationImageFile: File | null;
  },
  { rejectValue: string }
>(
  "cars/createNewCar",
  async (
    {
      carParameters,
      imageFile,
      innovationImageFile,
    }: {
      carParameters: CreateCarDTO;
      imageFile: File | null;
      innovationImageFile: File | null;
    },
    { rejectWithValue }
  ) => {
    try {
      const isCarExists = await carsService.isCarExists(carParameters.id);

      if (isCarExists) {
        return rejectWithValue("Авто з такою назвою вже є в каталозі");
      }
      let newImageLink = null;
      let newInnovationImageLink = null;

      if (imageFile) {
        newImageLink = await carsService.uploadCarImage(
          carParameters.id,
          imageFile,
          true
        );
      }

      if (innovationImageFile) {
        newInnovationImageLink = await carsService.uploadCarImage(
          carParameters.id,
          innovationImageFile,
          false
        );
      }

      const newCar = await carsService.createNewCar({
        ...carParameters,
        image: newImageLink ? newImageLink : carParameters.image,
        imageInnovation: newInnovationImageLink
          ? newInnovationImageLink
          : carParameters.imageInnovation,
      });

      return newCar;
    } catch (e: any) {
      return rejectWithValue(e.error.message);
    }
  }
);

export const deleteCar = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("cars/deleteCar", async (id: string, { rejectWithValue }) => {
  try {
    await carsService.deleteCar(id);
  } catch (e: any) {
    return rejectWithValue(e.error.message);
  }
});
