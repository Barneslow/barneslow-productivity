import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  timerLog: [],
  session: 0,
  workMinutes: 0.25,
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
      state.session += action.payload;
    },
    saveSession(state, action) {
      state.timerLog = action.payload;
    },
    resetCurrentSession(state) {
      state.session = INITIAL_STATE.session;
    },
  },
});

export const selectTimer = (state) => state.timer;
export const selectTimerLog = (state) => state.timer.timerLog;

export const timerActions = timerSlice.actions;

export default timerSlice;
