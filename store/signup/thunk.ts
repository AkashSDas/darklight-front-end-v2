import toast from "react-hot-toast";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignupPayload, signupService } from "@services/auth/signup";

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
