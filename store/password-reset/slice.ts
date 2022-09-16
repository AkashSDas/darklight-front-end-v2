import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../";
import { passwordResetThunk } from "./thunk";

export const passwordResetSlice = createSlice({
  name: "password-reset",
  initialState: { isLoading: false, resetToken: null } as {
    isLoading: boolean;
    resetToken: string | null;
  },
  reducers: {
    resetToken: (state, action: PayloadAction<string | null>) => {
      state.resetToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(passwordResetThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(passwordResetThunk.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(passwordResetThunk.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { resetToken } = passwordResetSlice.actions;

export const selectPasswordResetLoading = (state: RootState) =>
  state.passwordReset.isLoading;

export default passwordResetSlice.reducer;
