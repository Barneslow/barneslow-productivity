import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserTasksAction } from "../../store/taskSlice";
import Tasks from "./Tasks";

const TasksContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserTasksAction());
  }, [dispatch]);

  return <Tasks />;
};

export default TasksContainer;
