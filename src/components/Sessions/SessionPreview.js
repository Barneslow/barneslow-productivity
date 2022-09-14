import styles from "./SessionPreview.module.css";
import { useNavigate } from "react-router-dom";
import StudyBlock from "../Study/StudyBlock";
import SessionGoals from "./SessionGoals";

const SessionPreview = ({ session, state, setState }) => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    if (state === "full") return setState(session);

    navigate(`sessions/${session.id}`);
  };
  return (
    <button onClick={navigateHandler} className={styles.study}>
      <div className={styles.block}>
        <StudyBlock date={session.createdAt} />
      </div>
      <div className={styles.block}>
        <StudyBlock time={session.time} />
      </div>
      <div className={styles.block}>
        <SessionGoals
          rating={session.rating}
          time={session.time}
          sessionGoal={session.sessionGoal}
        />
      </div>
    </button>
  );
};

export default SessionPreview;
