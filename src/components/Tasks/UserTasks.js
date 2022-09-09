import { useSelector } from "react-redux";

import styles from "./UserTasks.module.css";

const UserTasks = ({ onClick }) => {
  const { tasks } = useSelector((state) => state.task);

  const pending = tasks?.filter((task) => task.status === "pending");
  const completed = tasks?.filter((task) => task.status === "completed");

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>USER TASKS</h2>
      <div className={styles.table}>
        <h3 className={styles.title}>Total Tasks</h3>
        <h3 className={styles.title}>Pending Tasks</h3>
        <h3 className={styles.title}>Completed Tasks</h3>
        <button onClick={() => onClick("total")} className={styles.total}>
          <i className="tasks icon blue"></i>
          {tasks.length}
        </button>
        <button onClick={() => onClick("pending")} className={styles.total}>
          <i className="sync icon orange"></i>
          {pending.length}
        </button>
        <button onClick={() => onClick("completed")} className={styles.total}>
          <i className="icon checkmark green"></i>
          {completed.length}
        </button>
      </div>
    </div>
  );
};

export default UserTasks;
