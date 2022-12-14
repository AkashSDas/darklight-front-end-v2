import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";

import baseAuthReducer from "./base-auth/slice";
import forgotPasswordReducer from "./forgot-password/slice";
import loginReducer from "./login/slice";
import navbarReducer from "./navbar/slice";
import passwordReducer from "./password-reset/slice";
import signupReducer from "./signup/slice";
import userReducer from "./user/slice";

const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    login: loginReducer,
    baseAuth: baseAuthReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    passwordReset: passwordReducer,
    signup: signupReducer,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export default store;
