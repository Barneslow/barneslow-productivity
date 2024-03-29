import { useSelector } from "react-redux";
import { secondsToHms } from "../../utils/secondsToHms";
import { sessionsWithinSevenDays } from "../../utils/sessionTimeSinceMonday";

import ViewMoreBtn from "../UI/ViewMoreBtn";

import styles from "../Tasks/UserTasks.module.css";
import { averageSessionTimeCalc } from "../../utils/Time/averageTimeSessionUtils";

const UserSessions = ({ onClick, setState, setValue, isLoggedInGuest }) => {
  const { sessions } = useSelector((state) => state.session);
  const { guestSessions } = useSelector((state) => state.guest);

  let recentSessions;
  let averageTime;
  let totalSessions;
  let totalTime;

  let selectedSessions;

  isLoggedInGuest
    ? (selectedSessions = guestSessions)
    : (selectedSessions = sessions);

  if (selectedSessions?.length > 0) {
    let averageSeconds = secondsToHms(averageSessionTimeCalc(selectedSessions));
    averageTime = `${averageSeconds.hours}:${averageSeconds.minutes}:${averageSeconds.seconds}`;
    totalSessions = selectedSessions?.length;

    let time = selectedSessions?.map((session) => session.time);
    let totalSeconds = secondsToHms(time?.reduce((acc, cur) => acc + cur));

    totalTime = `${totalSeconds.hours}:${totalSeconds.minutes}:${totalSeconds.seconds}`;

    recentSessions = sessionsWithinSevenDays(selectedSessions).length;
  }

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <button
          disabled={isLoggedInGuest}
          onClick={() => onClick("recent")}
          className={`${styles.block} ${styles["block-hover"]}`}
        >
          <h3 className={styles.title}>Recent</h3>
          <div className={`${styles.total} ${styles["total-hover"]}`}>
            <span className={styles.tooltip}>Register for access</span>

            <i className="calendar check icon red outline"></i>
            {recentSessions}
          </div>
        </button>

        <button
          disabled={isLoggedInGuest}
          onClick={() => onClick("rated")}
          className={`${styles.block} ${styles["block-hover"]}`}
        >
          <h3 className={styles.title}>Top Rated</h3>
          <div className={`${styles.total} ${styles["total-hover"]}`}>
            <span className={styles.tooltip}>Register for access</span>
            <i className="star icon yellow"></i>
          </div>
        </button>

        <button
          onClick={() => onClick("longest")}
          disabled={isLoggedInGuest}
          className={`${styles.block} ${styles["block-hover"]}`}
        >
          <h3 className={styles.title}>Longest</h3>
          <div className={`${styles.total} ${styles["total-hover"]}`}>
            <span className={styles.tooltip}>Register for access</span>

            <i className="hourglass half icon purple"></i>
          </div>
        </button>
      </div>

      <div className={`${styles.table} ${styles["small-grid"]}`}>
        <div className={styles.block}>
          <h3 className={styles.title}>Total</h3>
          <div className={styles.total}>
            <i className="pencil alternate icon blue"></i>
            {totalSessions}
          </div>
        </div>
        <div className={styles.block}>
          <h3 className={styles.title}>Average</h3>
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
