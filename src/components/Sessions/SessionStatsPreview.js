import { secondsToMinutes } from "date-fns";
import { useSelector } from "react-redux";
import { SessionBarChart, SessionRadialChart } from "../Data/ApexCharts";
import styles from "./SessionStatsPreview.module.css";
import StarSlideDown from "../UI/StarSlideDown";
import ViewMoreBtn from "../UI/ViewMoreBtn";

const SessionStatsPreview = ({ session }) => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <SessionRadialChart time={session.time} breakTime={session.breakTime} />
        <div className={styles.goal}>
          <h3>Session Goal</h3>
          <h3>{secondsToMinutes(user.sessionGoal)} mins</h3>
        </div>
      </div>
      <div className={styles.block}>
        <SessionBarChart
          time={session.time}
          breakTime={session.breakTime}
          date={session.createdAt}
        />
      </div>
      <div className={styles.block}>
        <StarSlideDown rating={session.rating} />
        <ViewMoreBtn path={`sessions/${session._id}`} />
      </div>
    </div>
  );
};

export default SessionStatsPreview;
