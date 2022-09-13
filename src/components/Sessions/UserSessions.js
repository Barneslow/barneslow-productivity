import { useSelector } from "react-redux";
import { secondsToHms } from "../../utils/secondsToHms";

import ViewMoreBtn from "../UI/ViewMoreBtn";

import styles from "../Tasks/UserTasks.module.css";

const UserSessions = ({ onClick, setState, setValue }) => {
  const { sessions } = useSelector((state) => state.session);

  let time = sessions?.map((session) => session.time);

  let totalSessions = sessions?.length;
  let totalTime;
  let averageTime;

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
      <div className={styles.table}>
        <div className={styles.block}>
          <h3 className={styles.title}>Total Sessions</h3>
          <button className={styles.total}>
            <i className="pencil alternate icon blue"></i> {totalSessions}
          </button>
        </div>
        <div className={styles.block}>
          <h3 className={styles.title}>Average Session</h3>
          <button className={styles.total}>
            <i className="stopwatch icon orange"></i>
            {averageTime}
          </button>
        </div>
        <div className={styles.block}>
          <h3 className={styles.title}>Total Time</h3>
          <button className={styles.total}>
            <i className="clock icon green"></i> {totalTime}
          </button>
        </div>
        <div className={`${styles.block} ${styles["block-hover"]}`}>
          <h3 className={styles.title}>Top Sessions</h3>
          <button
            onClick={() => onClick("top")}
            className={`${styles.total} ${styles["total-hover"]}`}
          >
            <i className="star icon yellow"></i>
          </button>
        </div>
      </div>

      <div className={styles.table}>
        <div className={styles.block}>
          <h3 className={styles.title}>Top Sessions</h3>
          <button className={styles.total}>
            <i className="pencil alternate icon blue"></i> {totalSessions}
          </button>
        </div>
        <div className={styles.block}>
          <h3 className={styles.title}>Average Session</h3>
          <button className={styles.total}>
            <i className="stopwatch icon orange"></i>
            {averageTime}
          </button>
        </div>
        <div className={styles.block}>
          <h3 className={styles.title}>Total Time</h3>
          <button className={styles.total}>
            <i className="clock icon green"></i> {totalTime}
          </button>
        </div>
        <div className={styles.view}>
          <ViewMoreBtn setState={setState} setValue={setValue} />
        </div>
      </div>
    </div>
  );
};

export default UserSessions;
