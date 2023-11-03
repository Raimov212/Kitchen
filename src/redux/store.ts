import { configureStore } from "@reduxjs/toolkit";
import restoreSlice from "./restoreRedux/restoreSlice";

const store = configureStore({
  reducer: {
    restore: restoreSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
