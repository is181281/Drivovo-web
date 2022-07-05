import { createAsyncThunk } from "@reduxjs/toolkit";

import firebase from "../../firebase";

export const login = createAsyncThunk<
  string | undefined | null,
  { email: string; password: string },
  { rejectValue: string }
>(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      return response.user?.email;
    } catch (e: any) {
      return rejectWithValue(e.code);
    }
  }
);
