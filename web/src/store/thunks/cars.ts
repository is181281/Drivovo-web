import { createAsyncThunk } from "@reduxjs/toolkit";

import carsService from "../../service/cars";
import { Car } from "../../types";

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
