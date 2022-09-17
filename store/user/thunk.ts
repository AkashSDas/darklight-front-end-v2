import toast from "react-hot-toast";

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  changeUsernameService,
  preFetchUser,
} from "@services/user/social-auth";

import { updateUser, User } from "./slice";

export const userInitFetchThunk = createAsyncThunk(
  "user/init-fetch-social-auth",
  async (_, { dispatch }) => {
    const response = await preFetchUser();

    console.log(response);
    if (response.error) toast.error(response.msg, { duration: 3500 });
    else {
      const data = response.data.data.user;
      const user: User = {
        id: data.id,
        userId: data.userId,
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        emailVerified: data.emailVerified,
        isActive: data.isActive,
        roles: data.roles,
        createdAt: data.createdAt,
        profilePic: data.profilePic ?? null,
      };
      dispatch(updateUser(user));
      toast.success(response.msg, { duration: 3500 });
    }
  }
);

export const changeUsernameThunk = createAsyncThunk(
  "user/social-auth-change-username",
  async (username: string, { getState, dispatch }) => {
    console.log(username);
    const response = await changeUsernameService(username);
    const user = (getState() as any).user.data;

    if (response.error) toast.error(response.msg, { duration: 3500 });
    else {
      dispatch(updateUser({ ...user, username: username }));
      toast.success(response.msg, { duration: 3500 });
    }
  }
);