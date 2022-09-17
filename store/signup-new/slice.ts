import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { checkEmailAvailableThunk, checkUsernameAvailableThunk } from "./thunk";

interface SignupState {
  isLoading: boolean;
  usernameChecking: boolean;
  emailChecking: boolean;
  usernameAvailable: boolean;
  emailAvailable: boolean;
}

const initialState: SignupState = {
  isLoading: false,
  usernameChecking: false,
  emailChecking: false,
  usernameAvailable: false,
  emailAvailable: false,
};

export const signupSlick = createSlice({
  name: "signup-new",
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
  },
});

// Actions
export const { updateUsernameAvailability, updateEmailAvailability } =
  signupSlick.actions;

// Reducer
export default signupSlick.reducer;
