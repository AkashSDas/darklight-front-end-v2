import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";

import loginReducer from "./login/slice";
import navbarReducer from "./navbar/slice";
import signupReducer from "./signup/slice";

const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    signup: signupReducer,
    login: loginReducer,
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
