import styles from "./SessionStats.module.css";
import DeleteSession from "./DeleteSession";
import { useSelector } from "react-redux";
import {
  averageSessionTimeCalc,
  averageTimePercentDifference,
} from "../../utils/Time/averageTimeSessionUtils";

import WatchLaterIcon from "@mui/icons-material/WatchLater";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { secondsToHms } from "../../utils/secondsToHms";
import {
  sessionLeaderboardCalc,
  topSessionPercent,
} from "../../utils/Leaderboard/sessionLeaderboardUtils";
import GoalAchieved from "./GoalAchieved";
import SessionRating from "./SessionRating";

const SessionStats = ({ session }) => {
  const { sessions } = useSelector((state) => state.session);
  const { user } = useSelector((state) => state.user);

  let sessionTime;
  let percentDifference;
  let className;
  let text;
  let ranking;
  let rankingPercent;
  let percentClassName;

  if (sessions.length > 0) {
    const averageSeconds = averageSessionTimeCalc(sessions);
    percentDifference = averageTimePercentDifference(
      averageSeconds,
      session.time
    );

    ranking = sessionLeaderboardCalc(sessions, session);
    rankingPercent = topSessionPercent(sessions, session);

    rankingPercent < 50
      ? (percentClassName = `${styles.green}`)
      : (percentClassName = `${styles.red}`);

    sessionTime = secondsToHms(session.time);

    if (averageSeconds > session.time) {
      className = `${styles.red}`;
      text = "-";
    } else {
      className = `${styles.green}`;
      text = "+";
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles["inner-container"]}>
          <div className={styles.block}>
            <div className={styles.header}>
              <div className={styles.icon}>
                <WatchLaterIcon sx={{ fontSize: 50, color: "white" }} />
              </div>
              <div className={styles["title-container"]}>
                <h3>Time</h3>
                <h2>
                  {sessionTime.hours}:{sessionTime.minutes}:
                  {sessionTime.seconds}
                </h2>
              </div>
            </div>
            <div className={styles.main}>
              <h3 className={`${styles.percent} ${className}`}>
                {text}
                {percentDifference}%
              </h3>
              <p className={styles.text}>than average session</p>
            </div>
          </div>
          <div className={styles.block}>
            <div className={styles.header}>
              <div className={`${styles.icon} ${styles.red}`}>
                <LeaderboardIcon sx={{ fontSize: 50, color: "white" }} />
              </div>
              <div className={styles["title-container"]}>
                <h3>Leaderboard</h3>
                <h2>{ranking}</h2>
              </div>
            </div>
            <div className={styles.main}>
              <p className={styles.text}>Top</p>
              <h3 className={`${styles.percent} ${percentClassName}`}>
                {rankingPercent}%
              </h3>
              <p className={styles.text}>sessions</p>
            </div>
          </div>
        </div>
        <div className={styles["inner-container"]}>
          <DeleteSession />
          <GoalAchieved
            goal={user?.sessionGoal}
            achieved={session?.time >= user?.sessionGoal}
          />
        </div>
      </div>
      <SessionRating rating={session?.rating} />
    </div>
  );
};

export default SessionStats;
