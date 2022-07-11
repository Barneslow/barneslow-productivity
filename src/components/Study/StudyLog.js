import StudySession from "./StudySession";
import { secondsToHms } from "../../utils/secondsToHms";

import "./StudyLog.css";

const StudyLog = (props) => {
  if (props.items.length === 0) {
    return <h2 className="expenses-list__fallback">Found no expenses.</h2>;
  }
  return (
    <ul className="expenses-list">
      {props.items.map((session) => (
        <StudySession
          key={session.id}
          id={session.id}
          time={session.time}
          date={session.date}
        />
      ))}
    </ul>
  );
};

export default StudyLog;
