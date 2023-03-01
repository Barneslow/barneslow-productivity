import { useSelector } from "react-redux";
import ViewMoreBtn from "../UI/ViewMoreBtn";

import styles from "./UserTasks.module.css";

const UserTasks = ({ onClick }) => {
  const { tasks } = useSelector((state) => state.task);
  const { guestTasks } = useSelector((state) => state.guest);
  const { isLoggedInGuest } = useSelector((state) => state.auth);

  let selectedTasks;
  isLoggedInGuest ? (selectedTasks = guestTasks) : (selectedTasks = tasks);

  const pending = selectedTasks?.filter((task) => task.status === "pending");
  const completed = selectedTasks?.filter(
    (task) => task.status === "completed"
  );

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <button
          onClick={() => onClick("total")}
          className={`${styles.block} ${styles["block-hover"]}`}
        >
          <h3 className={styles.title}>Total</h3>
          <div className={`${styles.total} ${styles["total-hover"]}`}>
            <i className="tasks icon blue"></i>
            {selectedTasks?.length}
          </div>
        </button>

        <button
          onClick={() => onClick("pending")}
          className={`${styles.block} ${styles["block-hover"]}`}
        >
          <h3 className={styles.title}>Pending</h3>
          <div className={`${styles.total} ${styles["total-hover"]}`}>
            <i className="sync icon orange"></i>
            {pending?.length}
          </div>
        </button>
        <button
          onClick={() => onClick("completed")}
          className={`${styles.block} ${styles["block-hover"]}`}
        >
          <h3 className={styles.title}>Completed</h3>
          <div className={`${styles.total} ${styles["total-hover"]}`}>
            <i className="icon checkmark green"></i>
            {completed?.length}
          </div>
        </button>
      </div>
      <div className={styles.view}>
        <ViewMoreBtn path={"tasks"} />
      </div>
    </div>
  );
};

export default UserTasks;
