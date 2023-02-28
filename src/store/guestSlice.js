import { createSlice } from "@reduxjs/toolkit";
import { udpatedTaskArr } from "./taskSlice";

const INITIAL_STATE = {
  guestSessions: [],
  guestTasks: [],
  guestNotes: [],
};

const guestSlice = createSlice({
  name: "guest",
  initialState: INITIAL_STATE,
  reducers: {
    createGuestSession: (state, action) => {
      state.guestSessions.push(action.payload);
    },
    removeGuestSession: (state, action) => {
      const sessionId = action.payload;
      state.guestSessions = state.guestSessions.filter(
        (session) => session.id !== sessionId
      );
    },
    createGuestTask: (state, action) => {
      state.guestTasks.push(action.payload);
    },
    updateGuestTask: (state, action) => {
      state.guestTasks = udpatedTaskArr(state.guestTasks, action.payload);
    },
    removeGuestTask: (state, action) => {
      const sessionId = action.payload;
      state.guestTasks = state.guestTasks.filter(
        (session) => session.id !== sessionId
      );
    },
  },
});

export const guestActions = guestSlice.actions;

export default guestSlice;
