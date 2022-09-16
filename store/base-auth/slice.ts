import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../";

export const baseAuthSlice = createSlice({
  name: "baseAuth",
  initialState: { accessToken: null } as { accessToken: string },
  reducers: {
    updateCredentials: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    logout: (state, action) => {
      state.accessToken = null;
    },
  },
});

export const { updateCredentials, logout } = baseAuthSlice.actions;
export const selectToken = (state: RootState) => state.baseAuth.accessToken;
export default baseAuthSlice.reducer;
