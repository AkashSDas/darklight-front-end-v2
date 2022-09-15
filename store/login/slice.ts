import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../";
import { loginThunk } from "./thunk";

export const loginSlice = createSlice({
  name: "login",
  initialState: { isLoading: false },
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
  },
});

export const selectLoginLoading = (state: RootState) => state.login.isLoading;
export default loginSlice.reducer;
