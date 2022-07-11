import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTimer,
  selectTimerLog,
  timerActions,
} from "../../store/timerSlice";

import Card from "../UI/Card";

import styles from "./CurrentSession.module.css";

const CurrentSession = () => {
  const dispatch = useDispatch();
  const timerState = useSelector(selectTimer);
  const timerLog = useSelector(selectTimerLog);
  const [currentSession, setCurrentSession] = useState();

  useEffect(() => {
    setCurrentSession(timerState.session);
  }, [timerState.session]);

  const saveSessionHandler = () => {
    const session = {
      time: currentSession,
      date: new Date().toISOString(),
      id: Math.floor(Math.random() * 100).toString(),
    };
    const newTimerLog = [...timerLog];

    newTimerLog.push(session);

    dispatch(timerActions.saveSession(newTimerLog));
    dispatch(timerActions.resetCurrentSession(0));
  };

  const log = () => {
    console.log(timerLog);
  };

  const minutes = Math.floor(currentSession / 60);
  let seconds = currentSession % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <Card>
      <div className={styles["current-session"]}>
        <h2 className={styles.title}>CURRENT SESSION :</h2>
        <h1 className={styles.number}>
          {minutes}:{seconds}
        </h1>
      </div>

      <div className={styles["current-session"]}>
        <div className="ui buttons">
          <button className="ui red button" onClick={log}>
            Cancel
          </button>
          <div className="or"></div>
          <button className="ui positive button" onClick={saveSessionHandler}>
            Save Session
          </button>
        </div>
      </div>
    </Card>
  );
};

export default CurrentSession;
