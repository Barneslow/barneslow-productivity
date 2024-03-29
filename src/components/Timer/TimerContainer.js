import { TimerContextProvider } from "../../contexts/timerContext";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUserSessionsAction } from "../../store/sessionSlice";

import TimerSettings from "./TimerSettings";
import CurrentSession from "./CurrentSession";

import Timer from "./Timer";

import { useDispatch } from "react-redux";
import styles from "./TimerContainer.module.css";

const TimerContainer = () => {
  const dispatch = useDispatch();

  const { userAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserSessionsAction());
  }, [dispatch, userAuth?.id]);

  return (
    <TimerContextProvider>
      <div className={styles.background}>
        <div className={styles.container}>
          <Timer />
          <div className={styles["sub-container"]}>
            <CurrentSession />
            <TimerSettings />
          </div>
        </div>
      </div>
    </TimerContextProvider>
  );
};

export default TimerContainer;
