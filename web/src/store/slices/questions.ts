import { createSlice } from "@reduxjs/toolkit";
import { Question, Status } from "../../types";
import { getQuestionsList } from "../thunks/questions";

interface QuestionsState {
  questionsList: Question[];
  questionsStatus: Status;
  questionsError: any;
}

const initialState: QuestionsState = {
  questionsList: [],
  questionsStatus: Status.idle,
  questionsError: null,
};

const questionsSlice = createSlice({
  name: "questionsReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuestionsList.pending, (state) => {
        state.questionsStatus = Status.loading;
      })
      .addCase(getQuestionsList.fulfilled, (state, action) => {
        state.questionsStatus = Status.succeeded;
        state.questionsList = action.payload;
        state.questionsError = null;
      })
      .addCase(getQuestionsList.rejected, (state, action) => {
        state.questionsStatus = Status.failed;
        state.questionsError = action.payload;
      });
  },
});

export default questionsSlice.reducer;
