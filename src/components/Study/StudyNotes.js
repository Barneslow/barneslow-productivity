import { useNavigate } from "react-router-dom";
import styles from "./StudyNotes.module.css";

const StudyNotes = ({ session }) => {
  const navigate = useNavigate();

  const viewSessionHandler = () => {
    navigate(`/sessions/${session}`);
  };

  return (
    <nav className={styles.notes}>
      <button className={styles["nav-item"]} onClick={viewSessionHandler}>
        <span>
          View Session <i className="edit icon"></i>
        </span>
      </button>
    </nav>
  );
};

export default StudyNotes;
