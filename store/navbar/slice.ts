import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../";

enum NavbarType {
  BASE = "base",
  AUTH = "auth",
}

interface NavbarState {
  type: NavbarType;
}

export const navbarSlice = createSlice({
  name: "navbar",
  initialState: { type: NavbarType.BASE } as NavbarState,
  reducers: {
    changeNavbarType: (state, action: PayloadAction<NavbarType>) => {
      state.type = action.payload;
    },
  },
});

export const { changeNavbarType } = navbarSlice.actions;
export const selectNavbarType = (state: RootState) => state.navbar.type;
export default navbarSlice.reducer;
