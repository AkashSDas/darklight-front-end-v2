import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  cancelSocialAuthThunk,
  checkEmailAvailableThunk,
  checkUsernameAvailableThunk,
  postOAuthSignupThunk,
  signupThunk,
} from "./thunk";

interface SignupState {
  isLoading: boolean;
  usernameChecking: boolean;
  emailChecking: boolean;
  usernameAvailable: boolean;
  emailAvailable: boolean;
  cancellingSocailAuth: boolean;
}

const initialState: SignupState = {
  isLoading: false,
  usernameChecking: false,
  emailChecking: false,
  usernameAvailable: false,
  emailAvailable: false,
  cancellingSocailAuth: false,
};

export const signupSlick = createSlice({
  name: "signup",
  initialState,
  reducers: {
    updateUsernameAvailability: (state, action: PayloadAction<boolean>) => {
      state.usernameAvailable = action.payload;
    },
    updateEmailAvailability: (state, action: PayloadAction<boolean>) => {
      state.emailAvailable = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Username checking
    builder.addCase(checkUsernameAvailableThunk.pending, (state) => {
      state.usernameChecking = true;
    });
    builder.addCase(checkUsernameAvailableThunk.fulfilled, (state) => {
      state.usernameChecking = false;
    });
    builder.addCase(checkUsernameAvailableThunk.rejected, (state) => {
      state.usernameChecking = false;
    });

    // Email checking
    builder.addCase(checkEmailAvailableThunk.pending, (state) => {
      state.emailChecking = true;
    });
    builder.addCase(checkEmailAvailableThunk.fulfilled, (state) => {
      state.emailChecking = false;
    });
    builder.addCase(checkEmailAvailableThunk.rejected, (state) => {
      state.emailChecking = false;
    });

    // Signup loading
    builder.addCase(signupThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signupThunk.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(signupThunk.rejected, (state) => {
      state.isLoading = false;
    });

    // Post OAuth signup loading
    builder.addCase(postOAuthSignupThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postOAuthSignupThunk.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(postOAuthSignupThunk.rejected, (state) => {
      state.isLoading = false;
    });

    // Cancel OAuth signup loading
    builder.addCase(cancelSocialAuthThunk.pending, (state) => {
      state.cancellingSocailAuth = true;
    });
    builder.addCase(cancelSocialAuthThunk.fulfilled, (state) => {
      state.cancellingSocailAuth = false;
    });
    builder.addCase(cancelSocialAuthThunk.rejected, (state) => {
      state.cancellingSocailAuth = false;
    });
  },
});

// Actions
export const { updateUsernameAvailability, updateEmailAvailability } =
  signupSlick.actions;

// Reducer
export default signupSlick.reducer;
