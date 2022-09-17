import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignupPayload, signupService } from "@services/auth/signup";
import {
  checkEmailAvailableService,
  checkUsernameAvailableService,
} from "@services/user/availability";
import {
  updateEmailAvailability,
  updateUsernameAvailability,
} from "@store/signup-new/slice";
import toast from "react-hot-toast";

/**
 * Check if the username is available OR not and update `store.signup.usernameAvailable` accordingly
 */
export const checkUsernameAvailableThunk = createAsyncThunk(
  "signup-new/check-username-availability",
  async (username: string, { dispatch }) => {
    const available = await checkUsernameAvailableService(username);
    console.log(available);
    dispatch(updateUsernameAvailability(available));
  }
);

/**
 * Check if the email is available OR not and update `store.signup.emailAvailable` accordingly
 */
export const checkEmailAvailableThunk = createAsyncThunk(
  "signup-new/check-email-availability",
  async (email: string, { dispatch }) => {
    const available = await checkEmailAvailableService(email);
    dispatch(updateEmailAvailability(available));
  }
);

export const signupThunk = createAsyncThunk(
  "signup-new/base-auth-signup",
  async (payload: SignupPayload) => {
    const response = await signupService(payload);

    if (response.error) {
      toast.error(response.msg, { duration: 3500 });
      return false;
    }

    toast.success(response.msg, { duration: 3500 });
    return true;
  }
);
