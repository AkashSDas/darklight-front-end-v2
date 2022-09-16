import toast from "react-hot-toast";

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  LoginPayload,
  loginService,
  logoutService,
  refreshService,
} from "@services/auth/login";
import { clearToken, updateCredentials } from "@store/base-auth/slice";
import { clearUser, updateUser, User } from "@store/user/slice";

export const loginThunk = createAsyncThunk(
  "login/baseLogin",
  async (payload: LoginPayload, { dispatch }) => {
    const response = await loginService(payload);
    console.log(response.data);

    if (response.error || !response.data) {
      toast.error(response.msg, { duration: 3500 });
    } else {
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
      dispatch(updateCredentials(response.data.data.accessToken));
      toast.success(response.msg, { duration: 3500 });
      return true;
    }
    return false;
  }
);

export const refreshThunk = createAsyncThunk(
  "login/refresh",
  async (_, { dispatch }) => {
    const response = await refreshService();
    console.log(response.data);

    if (response.error || !response.data) {
      toast.error(response.msg, { duration: 3500 });
    } else {
      dispatch(updateCredentials(response.data.data.accessToken));
      toast.success(response.msg, { duration: 3500 });
      return true;
    }
    return false;
  }
);

export const logoutThunk = createAsyncThunk(
  "login/logout",
  async (_, { getState, dispatch }) => {
    const accessToken = (getState() as any)?.baseAuth?.accessToken;

    if (!accessToken) {
      toast.error("No access token found", { duration: 3500 });
      return false;
    }
    const response = await logoutService();
    dispatch(clearToken());
    dispatch(clearUser());
    toast.success(response.msg, { duration: 3500 });
  }
);
