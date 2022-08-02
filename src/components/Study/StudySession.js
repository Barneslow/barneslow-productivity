import StudyBlock from "./StudyBlock";
import StudyNotes from "./StudyNotes";

import styles from "./StudySession.module.css";

const StudySession = (props) => {
  return (
    <div className={styles.study}>
      <StudyBlock date={props.date} />
      <StudyBlock time={props.time} />
      <StudyNotes session={props.id} />
    </div>
  );
};

export default StudySession;
