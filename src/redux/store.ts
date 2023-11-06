import { configureStore } from "@reduxjs/toolkit";
import restoreSlice from "./restoreRedux/restoreSlice";
import loginToken from "./restoreRedux/loginToken";

const store = configureStore({
  reducer: {
    loginAdminReducer: loginToken,
    restore: restoreSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
