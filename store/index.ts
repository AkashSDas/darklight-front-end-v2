import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";

import baseAuthReducer from "./base-auth/slice";
import loginReducer from "./login/slice";
import navbarReducer from "./navbar/slice";
import signupReducer from "./signup/slice";
import userReducer from "./user/slice";

const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    signup: signupReducer,
    login: loginReducer,
    baseAuth: baseAuthReducer,
    user: userReducer,
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
