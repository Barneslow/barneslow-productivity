import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddTask from "./AddTask";
import sortWithNullValue from "../../utils/sortWithNullValue";
import TaskArchive from "../Archive/TaskArchive";

import styles from "./Tasks.module.css";
import TaskList from "./TaskList";

const Tasks = () => {
  const tasks = useSelector((state) => state.task.tasks);
  const [addTask, setAddTask] = useState(false);
  const [tasksArray, setTasksArray] = useState();
  const [showArchive, setShowArchive] = useState(false);
  const { isLoggedInGuest } = useSelector((state) => state.auth);
  const { guestTasks } = useSelector((state) => state.guest);

  useEffect(() => {
    if (isLoggedInGuest) {
      setTasksArray(guestTasks);
    } else {
      setTasksArray(tasks);
    }
  }, [tasks, isLoggedInGuest, guestTasks]);

  const archivedTasks = tasks?.filter((task) => task.isArchive);

  const sortByDueDate = () => {
    if (!tasks || !guestTasks) return;

    let sortedArray;

    if (isLoggedInGuest) {
      sortedArray = [...guestTasks].sort((taskA, taskB) => {
        return taskA.dueDate > taskB.dueDate ? 1 : -1;
      });
    } else {
      sortedArray = [...tasks].sort((taskA, taskB) => {
        return taskA.dueDate > taskB.dueDate ? 1 : -1;
      });
    }

    setTasksArray(sortedArray);
    setShowArchive(false);
  };

  const sortByDateCreated = () => {
    let sortedArray = [...tasks].sort((taskA, taskB) => {
      return taskA.createdAt < taskB.createdAt ? 1 : -1;
    });

    setTasksArray(sortedArray);
    setShowArchive(false);
  };

  const sortByCompleted = () => {
    if (!tasks || !guestTasks) return;

    let sortedArray;

    if (isLoggedInGuest) {
      sortedArray = [...guestTasks].sort(sortWithNullValue(true));
    } else {
      sortedArray = [...tasks].sort(sortWithNullValue(true));
    }

    setTasksArray(sortedArray);
    setShowArchive(false);
  };

  useEffect(() => {
    sortByDueDate();
  }, [tasks?.length, guestTasks?.length]);

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
      <div className={styles.tasks}>
        <div className={styles.sorting}>
          <button
            disabled={isLoggedInGuest}
            className={styles.button}
            onClick={sortByDateCreated}
          >
            Created
          </button>
          <button className={styles.button} onClick={sortByDueDate}>
            Due
          </button>
          <button className={styles.button} onClick={sortByCompleted}>
            Completed
          </button>
          <button
            disabled={isLoggedInGuest}
            className={styles.button}
            onClick={showArchiveHandler}
          >
            Archive
          </button>
        </div>
        {!showArchive && (
          <>
            <div className={styles["add-task-container"]}>
              {!addTask ? (
                <div
                  className={styles["add-task"]}
                  onClick={showAddTaskHandler}
                >
                  <AddCircleIcon
                    className={styles.add}
                    sx={{
                      color: "white",
                      fontSize: 30,
                      opacity: 0.9,
                      stroke: "black",
                    }}
                  />
                  <h2>Add Task</h2>
                </div>
              ) : (
                <AddTask onClose={cancelTaskHandler} />
              )}
            </div>
            <TaskList state={"full"} tasksArray={tasksArray} />
          </>
        )}
        {showArchive && <TaskArchive />}
      </div>
    </div>
  );
};

export default Tasks;
