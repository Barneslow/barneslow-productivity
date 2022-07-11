import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import noteSlice from "./noteSlice";
import timerSlice from "./timerSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    note: noteSlice.reducer,
    timer: timerSlice.reducer,
    authentication: authSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
