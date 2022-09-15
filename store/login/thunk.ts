import toast from "react-hot-toast";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginPayload, loginService } from "@services/auth/login";

export const loginThunk = createAsyncThunk(
  "signup/baseLogin",
  async (payload: LoginPayload, { dispatch }) => {
    const response = await loginService(payload);
    console.log(response);

    if (response.error) {
      toast.error(response.msg, { duration: 3500 });
    } else {
      toast.success(response.msg, { duration: 3500 });
      return true;
    }

    return false;
  }
);
