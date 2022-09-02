import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import emojiSlice from "./emojiSlice";
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
    emoji: emojiSlice.reducer,
  },
});

export default store;
