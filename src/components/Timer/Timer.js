import { useContext, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTimer, timerActions } from "../../store/timerSlice";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import TimerContext from "../../contexts/timerContext";
import TimerButtons from "./TimerButtons";

import styles from "./Timer.module.scss";

const red = "#f54e4e";
const green = "#276009";
const black = "#020202";

const Timer = () => {
  const dispatch = useDispatch();
  const timerState = useSelector(selectTimer);
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
    const breakTime = timerState.breakMinutes;

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
          dispatch(
            timerActions.addCurrentSession({
              work: timerState.workMinutes * 60,
              break: timerState.breakMinutes * 60,
            })
          );
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
      <h2>{mode === "work" ? "Study Hard" : "Break Time"}</h2>
      <div className={styles.padding}>
        <div
          style={{
            width: 300,
            height: 300,
          }}
        >
          <CircularProgressbar
            value={(secondsLeft / totalSeconds) * 100}
            text={`${minutes} : ${seconds}`}
            styles={buildStyles({
              strokeWidth: 5,
              textColor: black,
              pathColor: mode === "work" ? red : green,
              tailColor: "rgba(255,255,255,.2)",
            })}
          />
        </div>
      </div>
      <TimerButtons
        handleStart={onPlayHandler}
        handlePause={onPauseHandler}
        handleReset={onResetHandler}
      />
    </div>
  );
};

export default Timer;
