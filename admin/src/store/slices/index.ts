import { combineReducers } from "redux";

import authReducer from "./auth";
import carsReducer from "./cars";
import questionsReducer from "./questions";

export const rootReducer = combineReducers({
  auth: authReducer,
  cars: carsReducer,
  questions: questionsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
