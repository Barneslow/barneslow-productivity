import Task from "./Task";
import styles from "./TasksList.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddTask from "./AddTask";
import sortWithNullValue from "../../utils/sortWithNullValue";
import TaskArchive from "../Archive/TaskArchive";

const TasksList = (props) => {
  const tasks = useSelector((state) => state.task.tasks);
  const [addTask, setAddTask] = useState(false);
  const [tasksArray, setTasksArray] = useState();
  const [showArchive, setShowArchive] = useState(false);

  const archivedTasks = tasks?.filter((task) => task.isArchive);

  const sortByDueDate = () => {
    let sortedArray;
    if (!tasks) return;

    sortedArray = [...tasks].sort((taskA, taskB) => {
      return taskA.dueDate > taskB.dueDate ? 1 : -1;
    });

    setTasksArray(sortedArray);
  };

  const sortByDateCreated = () => {
    let sortedArray;
    if (!tasks) return;

    sortedArray = [...tasks].sort((taskA, taskB) => {
      return taskA.createdAt < taskB.createdAt ? 1 : -1;
    });

    setTasksArray(sortedArray);
  };

  const sortByCompleted = () => {
    let sortedArray;
    if (!tasks) return;

    sortedArray = [...tasks].sort(sortWithNullValue(true));

    setTasksArray(sortedArray);
  };

  useEffect(() => {
    sortByDueDate();
  }, [tasks?.length]);

  const showAddTaskHandler = () => {
    setAddTask(true);
  };

  const cancelTaskHandler = () => {
    setAddTask(false);
  };

  const showArchiveHandler = () => {
    setShowArchive(!showArchive);
  };

  const archiveClasses = showArchive
    ? `${styles.archive} ${styles.button}`
    : `${styles.button}`;

  return (
    <div className={styles.container}>
      <div className={styles["tasks-list"]}>
        <div className={styles.sorting}>
          <button className={styles.button} onClick={sortByDateCreated}>
            Sort By Date Created
          </button>
          <button className={styles.button}>Sort By Due Date</button>
          <button className={styles.button}>Sort By Completed</button>
          <button className={archiveClasses} onClick={showArchiveHandler}>
            Archive
          </button>
        </div>
        {!showArchive && (
          <>
            <div className={styles["add-task"]}>
              {!addTask ? (
                <>
                  <h3>Add Task</h3>
                  <AddCircleIcon
                    className={styles.add}
                    sx={{ fontSize: 50, color: "#c2fafa;", stroke: "teal" }}
                    onClick={showAddTaskHandler}
                  />
                </>
              ) : (
                <AddTask onClose={cancelTaskHandler} />
              )}
            </div>
            <ul className={styles.list}>
              {tasksArray?.map((task) => (
                <Task key={task.id} data={task} />
              ))}
            </ul>
          </>
        )}
        {showArchive && <TaskArchive />}
      </div>
    </div>
  );
};

export default TasksList;
