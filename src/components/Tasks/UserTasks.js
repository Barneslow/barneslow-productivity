import { useSelector } from "react-redux";
import ViewMoreBtn from "../UI/ViewMoreBtn";

import styles from "./UserTasks.module.css";

const UserTasks = ({ onClick, isLoggedInGuest }) => {
  const { tasks } = useSelector((state) => state.task);

  const pending = tasks?.filter((task) => task.status === "pending");
  const completed = tasks?.filter((task) => task.status === "completed");

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>USER TASKS</h2>
      <div className={styles.table}>
        <button
          onClick={() => onClick("total")}
          className={`${styles.block} ${styles["block-hover"]}`}
        >
          <h3 className={styles.title}>Total Tasks</h3>
          <div className={`${styles.total} ${styles["total-hover"]}`}>
            <i className="tasks icon blue"></i>
            {isLoggedInGuest ? 0 : tasks?.length}
          </div>
        </button>

        <button
          onClick={() => onClick("pending")}
          className={`${styles.block} ${styles["block-hover"]}`}
        >
          <h3 className={styles.title}>Pending Tasks</h3>
          <div className={`${styles.total} ${styles["total-hover"]}`}>
            <i className="sync icon orange"></i>
            {isLoggedInGuest ? 0 : pending?.length}
          </div>
        </button>
        <button
          onClick={() => onClick("completed")}
          className={`${styles.block} ${styles["block-hover"]}`}
        >
          <h3 className={styles.title}>Completed Tasks</h3>
          <div className={`${styles.total} ${styles["total-hover"]}`}>
            <i className="icon checkmark green"></i>
            {isLoggedInGuest ? 0 : completed?.length}
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
