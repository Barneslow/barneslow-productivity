import { useDispatch } from "react-redux";
import { timerActions } from "../../store/timerSlice";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton, Tooltip } from "@mui/material";
import { createSessionAction } from "../../store/sessionSlice";
import Star from "./Star";

import styles from "./SaveSession.module.css";
import { secondsToHms } from "../../utils/secondsToHms";

const SaveSession = (props) => {
  const dispatch = useDispatch();
  const { session, rating, breakTime } = props;

  const confirmHandler = () => {
    const data = {
      time: session,
      breakTime,
      rating,
    };

    dispatch(createSessionAction(data));
    dispatch(timerActions.resetCurrentSession());
    props.setShowModal(false);
  };

  console.log(timerActions);
  const cancelHandler = () => {
    props.setShowModal(false);
  };

  const sessionTime = secondsToHms(session);

  return (
    <div className={styles.save}>
      <h2 className={styles.title}>Session Time</h2>
      <h2 className={styles["session-time"]}>
        {sessionTime.hours}:{sessionTime.minutes}:{sessionTime.seconds}
      </h2>
      <h2 className={styles.title}>Rating</h2>
      <h2 className={styles["session-time"]}>
        {Array.from(Array(rating), (e, i) => {
          return <Star key={i} rating={true} />;
        })}
      </h2>
      <div className={styles.buttons}>
        <Tooltip title="Save Session">
          <IconButton onClick={confirmHandler}>
            <CheckCircleIcon sx={{ color: "green", fontSize: 60 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Cancel">
          <IconButton onClick={cancelHandler}>
            <CancelIcon sx={{ color: "red", fontSize: 60 }} />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default SaveSession;
