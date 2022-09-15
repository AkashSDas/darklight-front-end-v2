import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";

import navbarReducer from "./navbar/slice";
import signupReducer from "./signup/slice";

const store = configureStore({
  reducer: {
    navbar: navbarReducer,
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
