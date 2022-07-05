/* eslint-disable max-len */
import { createSlice } from "@reduxjs/toolkit";

import { Car, Status } from "../../types";
import {
  createNewCar,
  deleteCar,
  getCarsList,
  updateCarImage,
  updateCarListPriority,
  updateCarParameters,
} from "../thunks/cars";

interface CarsState {
  carsList: Car[];
  currentCar: Car;
  newCar: Car;
  carsStatus: Status;
  carsError: any;
  updateCarImageStatus: Status;
  updateCarImageError: any;
  updateCarParametersStatus: Status;
  updateCarParametersError: any;
  showSaveCarListButton: boolean;
  updateCarListPriorityStatus: Status;
  updateCarListPriorityError: any;
  createNewCarStatus: Status;
  createNewCarError: any;
  deleteCarStatus: Status;
  deleteCarError: any;
}

const newCarInit: Car = {
  id: "newcar",
  image:
    "https://firebasestorage.googleapis.com/v0/b/drivovo-test.appspot.com/o/newcar%2Fnewcar.png?alt=media&token=163bcddf-ce23-4335-89f8-c7ab554b05fe",
  imageInnovation:
    "https://firebasestorage.googleapis.com/v0/b/drivovo-test.appspot.com/o/newcar%2Fnewcar_innovation.png?alt=media&token=87409145-8e59-457f-b85c-8e77f8e7a740",
  model: "New car",
  price: "0",
  priceForFacebook: 0,
  acceleation: "0",
  consumption: "0",
  power: "0",
  maxspeed: "0",
  totalPrice: "0",
  period: "36",
  cost3years: "0",
  firstMonthCost: "0",
  warrantyDeposit: "0",
  totalFirstPayment: "0",
  lastPayment: "0",
  priority: -1,
  brand: "New Brand",
};

const initialState: CarsState = {
  carsList: [],
  currentCar: {} as Car,
  newCar: newCarInit,
  carsStatus: Status.idle,
  carsError: null,
  updateCarImageStatus: Status.idle,
  updateCarImageError: null,
  updateCarParametersStatus: Status.idle,
  updateCarParametersError: null,
  showSaveCarListButton: false,
  updateCarListPriorityStatus: Status.idle,
  updateCarListPriorityError: null,
  createNewCarStatus: Status.idle,
  createNewCarError: null,
  deleteCarStatus: Status.idle,
  deleteCarError: null,
};

const carsSlice = createSlice({
  name: "carsReducer",
  initialState,
  reducers: {
    setCurrentCar: (state, action) => {
      state.currentCar = action.payload;
    },
    resetDeleteCarStatus: (state) => {
      state.deleteCarStatus = Status.idle;
    },
    resetCreateNewCarStatus: (state) => {
      state.createNewCarStatus = Status.idle;
    },
    switchCarsPriority: (state, action) => {
      const dragPriority = state.carsList.find(
        (car) => car.id === action.payload.dragId
      )!.priority;
      const dropPriority = state.carsList.find(
        (car) => car.id === action.payload.dropId
      )!.priority;
      state.carsList = state.carsList
        .map((car) => {
          if (car.id === action.payload.dragId) {
            return { ...car, priority: dropPriority };
          } else if (car.id === action.payload.dropId) {
            return { ...car, priority: dragPriority };
          } else return car;
        })
        .sort((a, b) => a.priority - b.priority);
      state.showSaveCarListButton = true;
    },
  },
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
      })
      .addCase(updateCarImage.pending, (state) => {
        state.updateCarImageStatus = Status.loading;
      })
      .addCase(updateCarImage.fulfilled, (state, action) => {
        state.updateCarImageStatus = Status.succeeded;
        state.carsList = state.carsList.map((car) =>
          car.id === action.meta.arg.id ? action.payload : car
        );
        state.currentCar = action.payload;
        state.updateCarImageError = null;
      })
      .addCase(updateCarImage.rejected, (state, action) => {
        state.updateCarImageStatus = Status.failed;
        state.updateCarImageError = action.payload;
      })
      .addCase(updateCarParameters.pending, (state) => {
        state.updateCarParametersStatus = Status.loading;
      })
      .addCase(updateCarParameters.fulfilled, (state, action) => {
        state.updateCarParametersStatus = Status.succeeded;
        state.carsList = state.carsList.map((car) =>
          car.id === action.meta.arg.id ? action.payload : car
        );
        state.currentCar = action.payload;
        state.updateCarParametersError = null;
      })
      .addCase(updateCarParameters.rejected, (state, action) => {
        state.updateCarParametersStatus = Status.failed;
        state.updateCarParametersError = action.payload;
      })
      .addCase(updateCarListPriority.pending, (state) => {
        state.updateCarListPriorityStatus = Status.loading;
      })
      .addCase(updateCarListPriority.fulfilled, (state, action) => {
        state.updateCarListPriorityStatus = Status.succeeded;
        state.showSaveCarListButton = false;
        state.carsList = action.payload;
        state.updateCarListPriorityError = null;
      })
      .addCase(updateCarListPriority.rejected, (state, action) => {
        state.updateCarListPriorityStatus = Status.failed;
        state.updateCarListPriorityError = action.payload;
      })
      .addCase(createNewCar.pending, (state) => {
        state.createNewCarStatus = Status.loading;
      })
      .addCase(createNewCar.fulfilled, (state, action) => {
        state.createNewCarStatus = Status.succeeded;
        state.carsList = [...state.carsList, action.payload];
        state.createNewCarError = null;
      })
      .addCase(createNewCar.rejected, (state, action) => {
        state.createNewCarStatus = Status.failed;
        state.createNewCarError = action.payload;
      })
      .addCase(deleteCar.pending, (state) => {
        state.deleteCarStatus = Status.loading;
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.deleteCarStatus = Status.succeeded;
        state.carsList = state.carsList.filter(
          (car) => car.id !== action.meta.arg
        );
        state.deleteCarError = null;
      })
      .addCase(deleteCar.rejected, (state, action) => {
        state.deleteCarStatus = Status.failed;
        state.deleteCarError = action.payload;
      });
  },
});

export default carsSlice.reducer;

export const {
  setCurrentCar,
  switchCarsPriority,
  resetDeleteCarStatus,
  resetCreateNewCarStatus,
} = carsSlice.actions;
