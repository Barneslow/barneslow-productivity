import styles from "./TaskArchive.module.css";
import Task from "../Tasks/Task";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTasksAction } from "../../store/taskSlice";

const TaskArchive = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserTasksAction());
  }, [dispatch]);

  const archivedTasks = useSelector((state) => state.task.tasks);

  const tasksArray = archivedTasks?.filter((task) => task.isArchive);

  return (
    <>
      {tasksArray?.length === 0 ? (
        <h1>No Archived Tasks</h1>
      ) : (
        <ul className={styles.list}>
          {tasksArray?.map((task) => (
            <Task key={task.id} data={task} />
          ))}
        </ul>
      )}
    </>
  );
};

export default TaskArchive;
