import StudySession from "./StudySession";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton } from "@mui/material";

import styles from "./StudySessionList.module.css";
import { useNavigate } from "react-router-dom";

const StudySessionList = (props) => {
  const navigate = useNavigate();

  const addSessionHandler = () => navigate("/study");

  if (props?.items?.length === 0) {
    return (
      <div className={styles.center}>
        <h2 className={styles.title}>No Study Sessions Logged</h2>
        <div className={styles["add-session"]} onClick={addSessionHandler}>
          <AddCircleIcon sx={{ color: "white", fontSize: 30, opacity: 0.9 }} />
          <h2>Add Session</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <ul className={styles["study-list"]}>
        {props?.items?.map((session) => (
          <StudySession
            key={session.id}
            id={session.id}
            time={session.time}
            date={session.createdAt}
            rating={session.rating}
          />
        ))}
      </ul>
      {/* <div className={styles.center}>
        <div className={styles["add-session"]} onClick={addSessionHandler}>
          <AddCircleIcon sx={{ color: "white", fontSize: 30, opacity: 0.9 }} />
          <h2>Add Session</h2>
        </div>
      </div> */}
    </>
  );
};

export default StudySessionList;
