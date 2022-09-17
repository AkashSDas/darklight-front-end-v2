import { createAsyncThunk } from "@reduxjs/toolkit";
import { cancelSocialAuthService } from "@services/auth/logout";
import {
  addPostOAuthUserInfoService,
  PostOAuthSignupPayload,
  SignupPayload,
  signupService,
} from "@services/auth/signup";
import {
  checkEmailAvailableService,
  checkUsernameAvailableService,
} from "@services/user/availability";
import {
  updateEmailAvailability,
  updateUsernameAvailability,
} from "@store/signup/slice";
import { clearUser } from "@store/user/slice";
import toast from "react-hot-toast";

/**
 * Check if the username is available OR not and update `store.signup.usernameAvailable` accordingly
 */
export const checkUsernameAvailableThunk = createAsyncThunk(
  "signup/check-username-availability",
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
  "signup/check-email-availability",
  async (email: string, { dispatch }) => {
    const available = await checkEmailAvailableService(email);
    dispatch(updateEmailAvailability(available));
  }
);

export const signupThunk = createAsyncThunk(
  "signup/base-auth-signup",
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

export const postOAuthSignupThunk = createAsyncThunk(
  "signup/post-social-auth-signup",
  async (payload: PostOAuthSignupPayload) => {
    const response = await addPostOAuthUserInfoService(payload);

    if (response.error) {
      toast.error(response.msg, { duration: 3500 });
      return false;
    }

    toast.success(response.msg, { duration: 3500 });
    return true;
  }
);

export const cancelSocialAuthThunk = createAsyncThunk(
  "signup/cancel-social-auth",
  async (_, { dispatch }) => {
    const response = await cancelSocialAuthService();

    if (response.error) {
      toast.error(response.msg, { duration: 3500 });
      return false;
    }

    dispatch(clearUser());
    toast.success(response.msg, { duration: 3500 });
    return true;
  }
);
