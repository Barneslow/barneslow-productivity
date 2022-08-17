import styles from "./Layout.module.css";
import {
  WeeklyChart,
  MonthlyChart,
  GoalChart,
  RatingsChart,
} from "../components/Stats/ApexCharts";
import { useSelector } from "react-redux";
import { frequencyCounter } from "../utils/frequencyCounter";
import { secondsToHms } from "../utils/secondsToHms";
import { sessionTimeSinceMonday } from "../utils/sessionTimeSinceMonday";

const Layout = (props) => {
  const { user } = useSelector((state) => state.user);
  const { sessions } = useSelector((state) => state.session);

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

  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        {user && sessions && (
          <>
            <div className={styles["chart-container"]}>
              <WeeklyChart sessions={sessions} />
            </div>
            <div className={styles["chart-container"]}>
              <GoalChart sessions={sessions} />
              <div className={styles.box}>
                <h2>{`Time Remaining - ${time.hours}:${time.minutes}:${time.seconds}`}</h2>
              </div>
            </div>
            <div className={styles["chart-container"]}>
              <MonthlyChart sessions={sessions} />
            </div>
            <div className={styles["chart-container"]}>
              <RatingsChart rating={rating} />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Layout;
