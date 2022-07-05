import { combineReducers } from "redux";

import carsReducer from "./cars";
import mailingReducer from "./mailing";
import questionsReducer from "./questions";

export const rootReducer = combineReducers({
  cars: carsReducer,
  mailing: mailingReducer,
  questions: questionsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
