import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserTasksAction } from "../../store/taskSlice";
import TasksList from "./TaskList";

const TasksContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserTasksAction());
  }, [dispatch]);

  return <TasksList />;
};

export default TasksContainer;
