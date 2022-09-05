import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  session: 0,
  sessionBreak: 0,
  workMinutes: 0.5,
  breakMinutes: 0.1,
  isPaused: true,
};

const timerSlice = createSlice({
  name: "timer",
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
