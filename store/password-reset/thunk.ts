import toast from "react-hot-toast";

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  PasswordResetPayload,
  passwordResetService,
} from "@services/auth/password-reset";

export const passwordResetThunk = createAsyncThunk(
  "password-reset/reset",
  async (payload: PasswordResetPayload, { getState, dispatch }) => {
    const token = (getState() as any).passwordReset.resetToken;
    const response = await passwordResetService(payload, token);

    if (response.error) {
      toast.error(response.msg, { duration: 3500 });
    } else {
      toast.success(response.msg, { duration: 3500 });
      return true;
    }

    return false;
  }
);
