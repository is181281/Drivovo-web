import { createSlice } from "@reduxjs/toolkit";
import { Car, Status } from "../../types";
import { getCarsList } from "../thunks/cars";

interface CarsState {
  carsList: Car[];
  carsStatus: Status;
  carsError: any;
}

const initialState: CarsState = {
  carsList: [],
  carsStatus: Status.idle,
  carsError: null,
};

const carsSlice = createSlice({
  name: "carsReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCarsList.pending, (state) => {
        state.carsStatus = Status.loading;
      })
      .addCase(getCarsList.fulfilled, (state, action) => {
        state.carsStatus = Status.succeeded;
        state.carsList = action.payload;
        state.carsError = null;
      })
      .addCase(getCarsList.rejected, (state, action) => {
        state.carsStatus = Status.failed;
        state.carsError = action.payload;
      });
  },
});

export default carsSlice.reducer;
