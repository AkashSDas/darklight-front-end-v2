import toast from "react-hot-toast";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginPayload, loginService } from "@services/auth/login";
import { updateCredentials } from "@store/base-auth/slice";
import { updateUser, User } from "@store/user/slice";

export const loginThunk = createAsyncThunk(
  "signup/baseLogin",
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
