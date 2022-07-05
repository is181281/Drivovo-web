import { createAsyncThunk } from "@reduxjs/toolkit";

import questionsService from "../../service/questions";
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
    return rejectWithValue(e);
  }
});
