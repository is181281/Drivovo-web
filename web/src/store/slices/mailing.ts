import { createSlice } from "@reduxjs/toolkit";

interface MailingState {
  isShowMailingPopup: boolean;
  isShowMailingConfirmationPopup: boolean;
}

const initialState: MailingState = {
  isShowMailingPopup: false,
  isShowMailingConfirmationPopup: false,
};

const mailingSlice = createSlice({
  name: "mailingReducer",
  initialState,
  reducers: {
    setIsShowMailingPopup: (state, action) => {
      state.isShowMailingPopup = action.payload;
    },
    setIsShowMailingConfirmationPopup: (state, action) => {
      state.isShowMailingConfirmationPopup = action.payload;
    },
  },
});

export default mailingSlice.reducer;

export const { setIsShowMailingPopup, setIsShowMailingConfirmationPopup } =
  mailingSlice.actions;
