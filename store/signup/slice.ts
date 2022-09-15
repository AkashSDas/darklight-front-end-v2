import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../";
import { signupThunk } from "./thunk";

export const signupSlice = createSlice({
  name: "signup",
  initialState: { isLoading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signupThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signupThunk.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(signupThunk.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const selectSignupLoading = (state: RootState) => state.signup.isLoading;
export default signupSlice.reducer;
