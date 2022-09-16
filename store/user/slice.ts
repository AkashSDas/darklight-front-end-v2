import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../";
import { changeUsernameThunk } from "./thunk";

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
  initialState: { data: initialState, changingUsername: false } as {
    data: User;
    changingUsername: boolean;
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
    builder.addCase(changeUsernameThunk.pending, (state) => {
      state.changingUsername = true;
    });
    builder.addCase(changeUsernameThunk.fulfilled, (state) => {
      state.changingUsername = false;
    });
    builder.addCase(changeUsernameThunk.rejected, (state) => {
      state.changingUsername = false;
    });
  },
});

export const { updateUser, clearUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.data;
export const selectChaningUsername = (state: RootState) =>
  state.user.changingUsername;
export default userSlice.reducer;
