import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../";
import { loginThunk, refreshThunk } from "./thunk";

export const loginSlice = createSlice({
  name: "login",
  initialState: { isLoading: false, initLoading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginThunk.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(loginThunk.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(refreshThunk.pending, (state) => {
      state.initLoading = true;
    });
    builder.addCase(refreshThunk.fulfilled, (state) => {
      state.initLoading = false;
    });
    builder.addCase(refreshThunk.rejected, (state) => {
      state.initLoading = false;
    });
  },
});

export const selectLoginLoading = (state: RootState) => state.login.isLoading;
export const selectInitLoading = (state: RootState) => state.login.initLoading;
export default loginSlice.reducer;
