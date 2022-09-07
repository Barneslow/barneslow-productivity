import Task from "./Task";

import styles from "./TaskList.module.css";

const TaskList = ({ tasksArray }) => {
  console.log(tasksArray);
  return (
    <div className={styles.container}>
      <div className={styles.labels}>
        <h3>Name</h3>
        <h3>Due Date</h3>
        <h3>Created</h3>
        <h3>Status</h3>
      </div>
      <ul className={styles.list}>
        {tasksArray?.map((task) => (
          <Task key={task.id} data={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
