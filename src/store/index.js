import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import emojiSlice from "./emojiSlice";
import noteSlice from "./noteSlice";
import sessionSlice from "./sessionSlice";
import taskSlice from "./taskSlice";
import timerSlice from "./timerSlice";
import userSlice from "./userSlice";
import thunk from "redux-thunk";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  note: noteSlice.reducer,
  timer: timerSlice.reducer,
  authentication: authSlice.reducer,
  user: userSlice.reducer,
  session: sessionSlice.reducer,
  task: taskSlice.reducer,
  emoji: emojiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
