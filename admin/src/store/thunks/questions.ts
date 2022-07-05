import { createAsyncThunk } from "@reduxjs/toolkit";

import questionsService from "../../service/question";
import { Question } from "../../types";

export const getQuestionsList = createAsyncThunk<
  Question[],
  void,
  { rejectValue: string }
>("questions/getQuestionsList", async (_, { rejectWithValue }) => {
  try {
    const questionsList = await questionsService.fetchQuestionsList();
    return questionsList;
  } catch (e: any) {
    console.log(e);
    return rejectWithValue(e);
  }
});

export const createNewQuestion = createAsyncThunk<
  Question,
  Omit<Question, "id">,
  { rejectValue: string }
>(
  "questions/createNewQuestion",
  async (question: Omit<Question, "id">, { rejectWithValue }) => {
    try {
      const newQuestion = await questionsService.createNewQuestion(question);

      return newQuestion;
    } catch (e: any) {
      console.log(e);
      return rejectWithValue(e.error.message);
    }
  }
);

export const updateQuestion = createAsyncThunk<
  Question,
  Question,
  { rejectValue: string }
>(
  "questions/updateQuestion",
  async (updateParameters: Question, { rejectWithValue }) => {
    try {
      const updatedQuestion = await questionsService.updateQuestion(
        updateParameters
      );

      return updatedQuestion;
    } catch (e: any) {
      console.log(e);
      return rejectWithValue(e.error.message);
    }
  }
);

export const deleteQuestion = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("questions/deleteQuestion", async (id: string, { rejectWithValue }) => {
  try {
    await questionsService.deleteQuestion(id);
  } catch (e: any) {
    console.log(e);
    return rejectWithValue(e.error.message);
  }
});

export const updateQuestionListPriority = createAsyncThunk<
  Question[],
  Question[],
  { rejectValue: string }
>(
  "questions/updateQuestionListPriority",
  async (questionList: Question[], { rejectWithValue }) => {
    try {
      const updatedQuestionList =
        await questionsService.updateQuestionListPriority(questionList);

      return updatedQuestionList;
    } catch (e: any) {
      return rejectWithValue(e.error.message);
    }
  }
);
