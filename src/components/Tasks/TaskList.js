import Task from "./Task";
import styles from "./TaskList.module.css";
import TaskPreview from "./TaskPreview";

const TaskList = ({ tasksArray, state }) => {
  return (
    <div className={styles.container}>
      {tasksArray && tasksArray.length !== 0 ? (
        <>
          <div className={styles.labels}>
            <h3>Name</h3>
            <h3>Status</h3>
            <h3>Date</h3>
            <h3>Created</h3>
            <h3>Edit</h3>
          </div>
          <ul className={styles.list}>
            {state === "preview" &&
              tasksArray?.map((task) => (
                <TaskPreview key={task.id} task={task} />
              ))}
            {state === "full" &&
              tasksArray?.map((task) => <Task key={task.id} task={task} />)}
          </ul>
        </>
      ) : (
        <div className={styles.empty}>
          <h3 className={styles.alert}>No pending tasks</h3>
        </div>
      )}
    </div>
  );
};

export default TaskList;
