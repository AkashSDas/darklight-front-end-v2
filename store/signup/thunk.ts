import toast from "react-hot-toast";

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  emailAvailableService,
  SignupPayload,
  signupService,
  usernameAvailableService,
} from "@services/auth/signup";

import { changeEmailAvailability, changeUsernameAvailability } from "./slice";

export const signupThunk = createAsyncThunk(
  "signup/baseSignup",
  async (payload: SignupPayload, { dispatch }) => {
    const response = await signupService(payload);

    if (response.error) {
      toast.error(response.msg, { duration: 3500 });
    } else {
      toast.success(response.msg, { duration: 3500 });
      return true;
    }

    return false;
  }
);

export const usernameAvailableThunk = createAsyncThunk(
  "signup/username-availability",
  async (username: string, { dispatch }) => {
    const response = await usernameAvailableService(username);
    console.log(response.data.data.available);
    if (response.error) toast.error(response.msg, { duration: 3500 });
    else {
      dispatch(changeUsernameAvailability(response.data.data.available));
    }
  }
);

export const emailAvailableThunk = createAsyncThunk(
  "signup/email-availability",
  async (email: string, { dispatch }) => {
    const response = await emailAvailableService(email);
    if (response.error) toast.error(response.msg, { duration: 3500 });
    else {
      dispatch(changeEmailAvailability(response.data.data.available));
    }
  }
);
