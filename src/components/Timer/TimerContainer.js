import { TimerContextProvider } from "../../contexts/timerContext";
import TimerSettings from "./TimerSettings";
import CurrentSession from "./CurrentSession";

import Timer from "./Timer";

import styles from "../../App.module.css";

const TimerContainer = () => {
  return (
    <TimerContextProvider>
      <div className={styles.container}>
        <Timer />
        <CurrentSession />
        <TimerSettings />
      </div>
    </TimerContextProvider>
  );
};

export default TimerContainer;
