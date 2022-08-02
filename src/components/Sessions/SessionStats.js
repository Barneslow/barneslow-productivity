import { useState } from "react";
import SessionDate from "./SessionDate";
import SessionTime from "./SessionTime";

import styles from "./SessionStats.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteSessionAction } from "../../store/sessionSlice";
import DeleteSession from "./DeleteSession";

const SessionStats = ({ session }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const deleteNoteHandler = () => {
    setShowModal(true);
  };

  const confirmHandler = () => {
    dispatch(deleteSessionAction(id));
    navigate("/dashboard");
  };
  const cancelHandler = () => {
    setShowModal(false);
  };

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
