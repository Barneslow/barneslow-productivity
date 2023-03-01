import { useSelector } from "react-redux";
import CompleteTask from "./CompleteTask";
import OverDueTask from "./OverDueTask";
import PendingTask from "./PendingTask";

const Task = ({ task }) => {
  const { isLoggedInGuest } = useSelector((state) => state.auth);

  let content;

  if (new Date(task.dueDate) < new Date() && task.status !== "completed") {
    content = <OverDueTask task={task} isLoggedInGuest={isLoggedInGuest} />;
  } else if (task.status === "completed") {
    content = <CompleteTask task={task} isLoggedInGuest={isLoggedInGuest} />;
  } else if (task.status === "pending") {
    content = <PendingTask task={task} isLoggedInGuest={isLoggedInGuest} />;
  }

  return <>{content}</>;
};

export default Task;
