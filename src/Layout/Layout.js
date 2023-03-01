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
  const { isLoggedInGuest } = useSelector((state) => state.auth);
  const { guestSessions, guestWeeklyGoal } = useSelector(
    (state) => state.guest
  );

  const ratingArray = [];

  let selectedSessions;
  let selectedWeeklyGoal;

  if (isLoggedInGuest) {
    selectedSessions = guestSessions;
    selectedWeeklyGoal = guestWeeklyGoal;
  } else {
    selectedSessions = sessions;
    selectedWeeklyGoal = user?.weeklyGoal;
  }

  selectedSessions?.forEach((session) => ratingArray.push(session.rating));

  const rating = frequencyCounter(ratingArray);

  let totalTime;
  if (selectedSessions?.length > 0) {
    totalTime = sessionTimeSinceMonday(selectedSessions);
  } else {
    totalTime = 0;
  }

  const time = secondsToHms(selectedWeeklyGoal - totalTime);

  let timeRemaining;
  if (selectedWeeklyGoal > totalTime) {
    timeRemaining = `Time Remaining - ${time.hours}:${time.minutes}:${time.seconds}`;
  } else {
    timeRemaining = "Weekly Goal Complete";
  }

  return (
    <div className={styles.wrapper}>
      <TaskInformation />
      <SessionInformation setState={setState} setValue={setValue} />
      <main className={styles.main}>
        {selectedSessions && (
          <>
            <div className={styles["chart-container"]}>
              <WeeklyChart sessions={selectedSessions} />
            </div>
            <div className={styles["chart-container"]}>
              <GoalChart
                sessions={selectedSessions}
                totalTime={totalTime}
                weeklyGoal={selectedWeeklyGoal}
              />
              <div className={styles.box}>
                <h2>{timeRemaining}</h2>
              </div>
            </div>
            <div className={styles["chart-container"]}>
              <MonthlyChart sessions={selectedSessions} />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Layout;
