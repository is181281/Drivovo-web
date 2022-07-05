import { createSlice } from "@reduxjs/toolkit";

import { Question, Status } from "../../types";
import {
  createNewQuestion,
  deleteQuestion,
  getQuestionsList,
  updateQuestion,
  updateQuestionListPriority,
} from "../thunks/questions";

interface QuestionState {
  questionList: Question[];
  questionStatus: Status;
  questionError: any;
  updateQuestionListPriorityStatus: Status;
  updateQuestionListPriorityError: any;
  createNewQuestionStatus: Status;
  createNewQuestionError: any;
  updateQuestionStatus: Status;
  updateQuestionError: any;
  deleteQuestionStatus: Status;
  deleteQuestionError: any;
  showSaveQuestionListButton: boolean;
}

const initialState: QuestionState = {
  questionList: [],
  questionStatus: Status.idle,
  questionError: null,
  updateQuestionListPriorityStatus: Status.idle,
  updateQuestionListPriorityError: null,
  createNewQuestionStatus: Status.idle,
  createNewQuestionError: null,
  updateQuestionStatus: Status.idle,
  updateQuestionError: null,
  deleteQuestionStatus: Status.idle,
  deleteQuestionError: null,
  showSaveQuestionListButton: false,
};

const questionSlice = createSlice({
  name: "questionsReducer",
  initialState,
  reducers: {
    switchQuestionsPriority: (state, action) => {
      const dragPriority = state.questionList.find(
        (question) => question.id === action.payload.dragId
      )!.priority;
      const dropPriority = state.questionList.find(
        (question) => question.id === action.payload.dropId
      )!.priority;
      state.questionList = state.questionList
        .map((question) => {
          if (question.id === action.payload.dragId) {
            return { ...question, priority: dropPriority };
          } else if (question.id === action.payload.dropId) {
            return { ...question, priority: dragPriority };
          } else return question;
        })
        .sort((a, b) => a.priority - b.priority);
      state.showSaveQuestionListButton = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuestionsList.pending, (state) => {
        state.questionStatus = Status.loading;
      })
      .addCase(getQuestionsList.fulfilled, (state, action) => {
        state.questionStatus = Status.succeeded;
        state.questionList = action.payload;
        state.questionError = null;
      })
      .addCase(getQuestionsList.rejected, (state, action) => {
        state.questionStatus = Status.failed;
        state.questionError = action.payload;
      })
      .addCase(createNewQuestion.pending, (state) => {
        state.createNewQuestionStatus = Status.loading;
      })
      .addCase(createNewQuestion.fulfilled, (state, action) => {
        state.createNewQuestionStatus = Status.succeeded;
        state.questionList = [...state.questionList, action.payload];
        state.createNewQuestionError = null;
      })
      .addCase(createNewQuestion.rejected, (state, action) => {
        state.createNewQuestionStatus = Status.failed;
        state.createNewQuestionError = action.payload;
      })
      .addCase(updateQuestion.pending, (state) => {
        state.updateQuestionStatus = Status.loading;
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.updateQuestionStatus = Status.succeeded;
        state.questionList = state.questionList.map((question) =>
          question.id === action.meta.arg.id ? action.payload : question
        );
        state.updateQuestionError = null;
      })
      .addCase(updateQuestion.rejected, (state, action) => {
        state.updateQuestionStatus = Status.failed;
        state.updateQuestionError = action.payload;
      })
      .addCase(deleteQuestion.pending, (state) => {
        state.deleteQuestionStatus = Status.loading;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.deleteQuestionStatus = Status.succeeded;
        state.questionList = state.questionList.filter(
          (question) => question.id !== action.meta.arg
        );
        state.deleteQuestionError = null;
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.deleteQuestionStatus = Status.failed;
        state.deleteQuestionError = action.payload;
      })
      .addCase(updateQuestionListPriority.pending, (state) => {
        state.updateQuestionListPriorityStatus = Status.loading;
      })
      .addCase(updateQuestionListPriority.fulfilled, (state, action) => {
        state.updateQuestionListPriorityStatus = Status.succeeded;
        state.showSaveQuestionListButton = false;
        state.questionList = action.payload;
        state.updateQuestionListPriorityError = null;
      })
      .addCase(updateQuestionListPriority.rejected, (state, action) => {
        state.updateQuestionListPriorityStatus = Status.failed;
        state.updateQuestionListPriorityError = action.payload;
      });
  },
});

export default questionSlice.reducer;

export const { switchQuestionsPriority } = questionSlice.actions;
