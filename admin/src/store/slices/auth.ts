import { createSlice } from "@reduxjs/toolkit";

import { login } from "../thunks/auth";
import { Status } from "../types";

interface AuthState {
  isAuthorized: boolean;
  authStatus: Status;
  emailError: string | undefined;
  passwordError: string | undefined;
  userEmail: string | null | undefined;
}

const initialState: AuthState = {
  isAuthorized: false,
  authStatus: Status.idle,
  emailError: undefined,
  passwordError: undefined,
  userEmail: null,
};

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setIsAuthorized: (state, action) => {
      state.isAuthorized = !!action.payload;
      state.userEmail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.authStatus = Status.loading;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authStatus = Status.succeeded;
        state.isAuthorized = true;
        state.userEmail = action.payload;
        state.emailError = undefined;
        state.passwordError = undefined;
      })
      .addCase(login.rejected, (state, action) => {
        state.authStatus = Status.failed;
        state.isAuthorized = false;
        if (action.payload === "auth/user-not-found") {
          state.emailError = "Користувача не знайдено";
          state.passwordError = undefined;
        }
        if (action.payload === "auth/wrong-password") {
          state.emailError = undefined;
          state.passwordError = "Невірний пароль";
        }
      });
  },
});

export default authSlice.reducer;

export const { setIsAuthorized } = authSlice.actions;
