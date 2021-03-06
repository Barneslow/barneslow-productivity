import { useContext, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTimer, timerActions } from "../../store/timerSlice";
import { selectNoteLog } from "../../store/noteSlice";

import { LinearProgress } from "@mui/material";

import TimerContext from "../../contexts/timerContext";
import TimerButtons from "./TimerButtons";

import styles from "./Timer.module.scss";

const Timer = () => {
  const dispatch = useDispatch();
  const timerState = useSelector(selectTimer);
  const noteState = useSelector(selectNoteLog);
  const timerCtx = useContext(TimerContext);
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  function switchMode() {
    const nextMode = modeRef.current === "work" ? "break" : "work";
    const nextSeconds =
      (nextMode === "work" ? timerState.workMinutes : timerState.breakMinutes) *
      60;

    setMode(nextMode);
    modeRef.current = nextMode;

    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  }

  const onPlayHandler = () => {
    setIsPaused(false);
    isPausedRef.current = false;
    timerCtx.isPaused = false;
  };

  const onPauseHandler = () => {
    setIsPaused(true);
    isPausedRef.current = true;
    timerCtx.isPaused = true;
  };

  const onResetHandler = () => {
    setIsPaused(true);

    isPausedRef.current = true;
    timerCtx.isPaused = true;

    const workTime = timerState.workMinutes;
    const breakTime = timerState.workMinutes;

    dispatch(timerActions.updateTimerClock({ workTime, breakTime }));
    secondsLeftRef.current = timerState.workMinutes * 60;

    setSecondsLeft(secondsLeftRef.current);
    modeRef.current = "work";
    setMode(modeRef.current);
  };

  useEffect(() => {
    secondsLeftRef.current = timerState.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        if (modeRef.current === "work") {
          dispatch(timerActions.addCurrentSession(timerState.workMinutes * 60));
        }
        switchMode();

        onPauseHandler();
        return;
      }

      tick();
    }, 1);

    return () => {
      clearInterval(interval);
    };
  }, [timerState.workMinutes, timerState.breakMinutes]);

  const log = () => {
    console.log(noteState);
  };

  const totalSeconds =
    mode === "work"
      ? timerState.workMinutes * 60
      : timerState.breakMinutes * 60;

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <div
      className={
        mode === "work"
          ? styles.container
          : `${styles.container} ${styles.break}`
      }
    >
      <h1>{mode === "work" ? "Study Hard" : "Break Time"}</h1>
      <h1>{`${minutes} : ${seconds}`}</h1>
      <div className={styles.padding}>
        <LinearProgress
          style={{ height: "1rem" }}
          variant="determinate"
          color={mode === "work" ? "error" : "success"}
          value={(secondsLeft / totalSeconds) * 100}
        />
      </div>
      <TimerButtons
        handleStart={onPlayHandler}
        handlePause={onPauseHandler}
        handleReset={onResetHandler}
      />
      <button onClick={log}>LOG NOTE STATE</button>
    </div>
  );
};

export default Timer;
