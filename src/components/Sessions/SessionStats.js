import SessionDate from "./SessionDate";
import SessionTime from "./SessionTime";

import styles from "./SessionStats.module.css";
import DeleteSession from "./DeleteSession";

const SessionStats = ({ session }) => {
  return (
    <div className={styles.border}>
      <h2 className={styles.title}>Session Details</h2>
      <div className={styles["stats-container"]}>
        <SessionDate date={session?.createdAt} />
        <SessionTime
          time={session?.time}
          breakTime={session?.breakTime}
          date={session?.createdAt}
        />
        <DeleteSession />
      </div>
    </div>
  );
};

export default SessionStats;
