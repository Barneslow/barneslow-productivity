import StudySession from "./StudySession";
import { useSelector } from "react-redux";

import styles from "./StudySessionList.module.css";

const StudySessionList = (props) => {
  if (props?.items?.length === 0) {
    return <h2 className="expenses-list__fallback">Found no expenses.</h2>;
  }

  return (
    <ul className={styles["study-list"]}>
      {props?.items?.map((session) => (
        <StudySession
          key={session.id}
          id={session.id}
          time={session.time}
          date={session.createdAt}
        />
      ))}
    </ul>
  );
};

export default StudySessionList;
