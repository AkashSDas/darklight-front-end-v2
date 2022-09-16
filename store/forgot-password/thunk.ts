import toast from "react-hot-toast";

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ForgotPasswordPayload,
  forgotPasswordService,
} from "@services/auth/forgot-password";

export const forgotPasswordThunk = createAsyncThunk(
  "forgot-password/send-msg",
  async (payload: ForgotPasswordPayload, { dispatch }) => {
    const response = await forgotPasswordService(payload);

    if (response.error) {
      toast.error(response.msg, { duration: 3500 });
    } else {
      toast.success(response.msg, { duration: 3500 });
      return true;
    }

    return false;
  }
);
