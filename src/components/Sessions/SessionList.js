import styles from "../Tasks/TaskList.module.css";
import SessionPreview from "./SessionPreview";

const SessionList = ({ sessionArray, state, setState }) => {
  return (
    <div className={styles.container}>
      {sessionArray && sessionArray.length !== 0 ? (
        <>
          <div className={`${styles.labels} ${styles["small-grid"]}`}>
            <h3>Date</h3>
            <h3>Time</h3>
            <h3>Rating</h3>
          </div>
          <ul className={styles.list}>
            {state === "preview" &&
              sessionArray?.map((session) => (
                <SessionPreview key={session.id} session={session} />
              ))}
            {state === "full" &&
              sessionArray?.map((session) => (
                <SessionPreview
                  key={session.id}
                  session={session}
                  state={state}
                  setState={setState}
                />
              ))}
          </ul>
        </>
      ) : (
        <div className={styles.empty}>
          <h3 className={styles.alert}>No Sessions</h3>
        </div>
      )}
    </div>
  );
};

export default SessionList;
