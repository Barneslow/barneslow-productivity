import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import noteSlice from "./noteSlice";
import sessionSlice from "./sessionSlice";
import taskSlice from "./taskSlice";
import timerSlice from "./timerSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    note: noteSlice.reducer,
    timer: timerSlice.reducer,
    authentication: authSlice.reducer,
    user: userSlice.reducer,
    session: sessionSlice.reducer,
    task: taskSlice.reducer,
  },
});

export default store;
