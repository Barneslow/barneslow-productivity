import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinearProgress } from "@mui/material";

import { selectTimer, timerActions } from "../../store/timerSlice";

import Card from "../UI/Card";

import styles from "./CurrentSession.module.css";
import CountdownTimer from "./CountdownTimer";
import { secondsToHms } from "../../utils/secondsToHms";
import SessionStars from "./SessionStars";
import SaveSession from "./SaveSession";
import Modal from "../UI/Modal";

const CurrentSession = () => {
  const dispatch = useDispatch();
  const timerState = useSelector(selectTimer);
  const [currentSession, setCurrentSession] = useState();
  const [currentBreak, setCurrentBreak] = useState();
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user } = useSelector((state) => state.user);

  const [stars, setStars] = useState(3);

  useEffect(() => {
    if (currentSession <= 0) {
      setError(true);
    } else {
      setError(false);
    }
    setCurrentSession(timerState.session);
    setCurrentBreak(timerState.sessionBreak);
  }, [timerState.session, timerState.sessionBreak, currentSession]);

  const saveSessionHandler = () => {
    setShowModal(true);
  };

  const resetSession = () => {
    dispatch(timerActions.resetCurrentSession(0));
  };

  const sessionTime = secondsToHms(currentSession);

  const goal = user?.sessionGoal ? user?.sessionGoal : 0;
  let value = (currentSession / goal) * 100;

  if (currentSession > user?.sessionGoal) {
    value = 100;
  }

  return (
    <>
      {showModal && (
        <Modal>
          <SaveSession
            session={currentSession}
            breakTime={currentBreak}
            rating={stars}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
      <div className={styles.container}>
        <div className={styles["current-session"]}>
          <h2 className={styles.title}>CURRENT SESSION</h2>
        </div>
        <div className={styles["timer-container"]}>
          <LinearProgress
            style={{ height: "1.5rem", borderRadius: 5 }}
            variant="determinate"
            value={value}
            color={currentSession > goal ? "success" : "error"}
          />
          <div className={styles["session-stats"]}>
            <div className={styles["session-time"]}>
              <h3>Session Time</h3>
              <h3>
                {sessionTime.hours}:{sessionTime.minutes}:{sessionTime.seconds}
              </h3>
            </div>
            <div className={styles["session-time"]}>
              <h3>
                {goal < currentSession ? "Completed Goal" : "Time Until Goal"}
              </h3>
              <CountdownTimer goal={goal} session={currentSession} />
            </div>
          </div>
        </div>
        <div className={styles.save}>
          <SessionStars stars={stars} setStars={setStars} />
          <div className={styles["current-session"]}>
            <div className="ui buttons">
              <button className="ui red button" onClick={resetSession}>
                Cancel
              </button>
              <div className="or"></div>
              {error ? (
                <button className="ui positive button" disabled>
                  Save Session
                </button>
              ) : (
                <button
                  className="ui positive button"
                  onClick={saveSessionHandler}
                >
                  Save Session
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentSession;
