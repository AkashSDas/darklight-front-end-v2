import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../";
import {
  emailAvailableThunk,
  signupThunk,
  usernameAvailableThunk,
} from "./thunk";

export const signupSlice = createSlice({
  name: "signup",
  initialState: {
    isLoading: false,
    usernameAvailable: false,
    emailAvailable: false,
    usernameChecking: false,
    emailChecking: false,
  } as {
    isLoading: boolean;
    usernameAvailable: boolean;
    emailAvailable: boolean;
    usernameChecking: boolean;
    emailChecking: boolean;
  },
  reducers: {
    changeUsernameAvailability: (state, action: PayloadAction<boolean>) => {
      state.usernameAvailable = action.payload;
    },
    changeEmailAvailability: (state, action: PayloadAction<boolean>) => {
      state.emailAvailable = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signupThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signupThunk.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(signupThunk.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(usernameAvailableThunk.pending, (state) => {
      state.usernameChecking = true;
    });
    builder.addCase(usernameAvailableThunk.fulfilled, (state) => {
      state.usernameChecking = false;
    });
    builder.addCase(usernameAvailableThunk.rejected, (state) => {
      state.usernameChecking = false;
    });

    builder.addCase(emailAvailableThunk.pending, (state) => {
      state.emailChecking = true;
    });
    builder.addCase(emailAvailableThunk.fulfilled, (state) => {
      state.emailChecking = false;
    });
    builder.addCase(emailAvailableThunk.rejected, (state) => {
      state.emailChecking = false;
    });
  },
});

export const selectSignupLoading = (state: RootState) => state.signup.isLoading;
export const { changeEmailAvailability, changeUsernameAvailability } =
  signupSlice.actions;
export default signupSlice.reducer;
