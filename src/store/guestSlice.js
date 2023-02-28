import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  sessions: [],
  tasks: [],
  notes: [],
};

const guestSlice = createSlice({
  name: "guest",
  initialState: INITIAL_STATE,
  reducers: {
    updateTimerClock(state, action) {
      const { workTime, breakTime } = action.payload;
      state.workMinutes = workTime;
      state.breakMinutes = breakTime;
    },
    addCurrentSession(state, action) {
      state.session += action.payload.work;
      state.sessionBreak += action.payload.break;
    },
    resetCurrentSession(state) {
      state.session = INITIAL_STATE.session;
      state.sessionBreak = INITIAL_STATE.sessionBreak;
    },
  },
});

export const selectTimer = (state) => state.timer;
export const selectTimerLog = (state) => state.timer.timerLog;

export const timerActions = timerSlice.actions;

export default timerSlice;