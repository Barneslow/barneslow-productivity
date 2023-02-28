import styles from "./Layout.module.css";
import {
  WeeklyChart,
  MonthlyChart,
  GoalChart,
} from "../components/Data/ApexCharts";
import { useSelector } from "react-redux";
import { frequencyCounter } from "../utils/frequencyCounter";
import { secondsToHms } from "../utils/secondsToHms";
import { sessionTimeSinceMonday } from "../utils/sessionTimeSinceMonday";

import TaskInformation from "../components/Tasks/TaskInformation";
import SessionInformation from "../components/Sessions/SessionInformation";

const Layout = ({ setState, setValue }) => {
  const user = useSelector((state) => state.user.user);
  const sessions = useSelector((state) => state.session.sessions);

  const ratingArray = [];

  sessions?.forEach((session) => ratingArray.push(session.rating));

  const rating = frequencyCounter(ratingArray);

  let totalTime;
  if (sessions?.length > 0) {
    totalTime = sessionTimeSinceMonday(sessions);
  } else {
    totalTime = 0;
  }

  const time = secondsToHms(user?.weeklyGoal - totalTime);

  let timeRemaining;
  if (user?.weeklyGoal > totalTime) {
    timeRemaining = `Time Remaining - ${time.hours}:${time.minutes}:${time.seconds}`;
  } else {
    timeRemaining = "Weekly Goal Complete";
  }

  return (
    <div className={styles.layout}>
      <TaskInformation />
      <SessionInformation setState={setState} setValue={setValue} />
      <main className={styles.main}>
        {user && sessions && (
          <>
            <div className={styles["chart-container"]}>
              <WeeklyChart sessions={sessions} />
            </div>
            <div className={styles["chart-container"]}>
              <GoalChart sessions={sessions} totalTime={totalTime} />
              <div className={styles.box}>
                <h2>{timeRemaining}</h2>
              </div>
            </div>
            <div className={styles["chart-container"]}>
              <MonthlyChart sessions={sessions} />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Layout;
