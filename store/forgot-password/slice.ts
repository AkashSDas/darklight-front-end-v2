import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../";
import { forgotPasswordThunk } from "./thunk";

export const forgotPasswordSlice = createSlice({
  name: "forgot-password",
  initialState: { isLoading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(forgotPasswordThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(forgotPasswordThunk.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(forgotPasswordThunk.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const selectForgotPasswordLoading = (state: RootState) =>
  state.forgotPassword.isLoading;

export default forgotPasswordSlice.reducer;
