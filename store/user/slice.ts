import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../";
import { socialLoggingOutThunk } from "./thunk";

export interface User {
  id: string;
  userId: string;
  fullName: string;
  username: string;
  email: string;
  emailVerified: boolean;
  isActive: boolean;
  roles: ("student" | "instructor" | "admin")[];
  createdAt: string;
  profilePic: { id: string; URL: string } | null;
}

const initialState: User = {
  id: null,
  userId: null,
  fullName: null,
  username: null,
  email: null,
  emailVerified: false,
  isActive: false,
  roles: [],
  createdAt: null,
  profilePic: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: { data: initialState, socailLoggingOut: false } as {
    data: User;
    socailLoggingOut: boolean;
  },
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },
    clearUser: (state) => {
      state.data = initialState;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(socialLoggingOutThunk.pending, (state) => {
      state.socailLoggingOut = true;
    });
    builder.addCase(socialLoggingOutThunk.fulfilled, (state) => {
      state.socailLoggingOut = false;
    });
    builder.addCase(socialLoggingOutThunk.rejected, (state) => {
      state.socailLoggingOut = false;
    });
  },
});

export const { updateUser, clearUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.data;
export default userSlice.reducer;
