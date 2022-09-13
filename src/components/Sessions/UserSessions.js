import { useSelector } from "react-redux";
import { secondsToHms } from "../../utils/secondsToHms";
import { sessionsWithinSevenDays } from "../../utils/sessionTimeSinceMonday";

import ViewMoreBtn from "../UI/ViewMoreBtn";

import styles from "../Tasks/UserTasks.module.css";

const UserSessions = ({ onClick, setState, setValue }) => {
  const { sessions } = useSelector((state) => state.session);

  let time = sessions?.map((session) => session.time);

  let totalSessions = sessions?.length;
  let totalTime;
  let averageTime;
  let recentSessions = sessionsWithinSevenDays(sessions).length;

  if (time?.length > 0) {
    let totalSeconds = time?.reduce((acc, cur) => acc + cur);
    let averageSeconds = Math.round(totalSeconds / totalSessions);

    totalSeconds = secondsToHms(totalSeconds);
    averageSeconds = secondsToHms(averageSeconds);

    totalTime = `${totalSeconds.hours}:${totalSeconds.minutes}:${totalSeconds.seconds}`;
    averageTime = `${averageSeconds.hours}:${averageSeconds.minutes}:${averageSeconds.seconds}`;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>USER SESSIONS</h2>
      <div className={`${styles.table} ${styles["small-grid"]}`}>
        <button
          onClick={() => onClick("rated")}
          className={`${styles.block} ${styles["block-hover"]}`}
        >
          <h3 className={styles.title}>Top Rated</h3>
          <div
            onClick={() => onClick("rated")}
            className={`${styles.total} ${styles["total-hover"]}`}
          >
            <i className="star icon yellow"></i> {totalSessions}
          </div>
        </button>
        <button
          onClick={() => onClick("recent")}
          className={`${styles.block} ${styles["block-hover"]}`}
        >
          <h3 className={styles.title}>Recent Sessions</h3>
          <div className={`${styles.total} ${styles["total-hover"]}`}>
            <i class="calendar check icon red outline"></i>
            {recentSessions}
          </div>
        </button>

        <button
          onClick={() => onClick("longest")}
          className={`${styles.block} ${styles["block-hover"]}`}
        >
          <h3 className={styles.title}>Longest Sessions</h3>
          <div className={`${styles.total} ${styles["total-hover"]}`}>
            <i className="hourglass half icon purple"></i>
          </div>
        </button>
      </div>

      <div className={`${styles.table} ${styles["small-grid"]}`}>
        <div className={styles.block}>
          <h3 className={styles.title}>Total Sessions</h3>
          <div className={styles.total}>
            <i className="pencil alternate icon blue"></i> {totalSessions}
          </div>
        </div>
        <div className={styles.block}>
          <h3 className={styles.title}>Average Session</h3>
          <div className={styles.total}>
            <i className="stopwatch icon orange"></i>
            {averageTime}
          </div>
        </div>
        <div className={styles.block}>
          <h3 className={styles.title}>Total Time</h3>
          <div className={styles.total}>
            <i className="clock icon green"></i> {totalTime}
          </div>
        </div>
      </div>
      <div className={styles.view}>
        <ViewMoreBtn setState={setState} setValue={setValue} />
      </div>
    </div>
  );
};

export default UserSessions;