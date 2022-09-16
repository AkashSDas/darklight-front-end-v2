import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../";

export const baseAuthSlice = createSlice({
  name: "baseAuth",
  initialState: { accessToken: null } as { accessToken: string },
  reducers: {
    updateCredentials: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    clearToken: (state) => {
      state.accessToken = null;
    },
  },
});

export const { updateCredentials, clearToken } = baseAuthSlice.actions;
export const selectToken = (state: RootState) => state.baseAuth.accessToken;
export default baseAuthSlice.reducer;
