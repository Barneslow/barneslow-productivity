import { useState } from "react";
import CompleteTask from "./CompleteTask";
import OverDueTask from "./OverDueTask";
import PendingTask from "./PendingTask";

const Task = ({ task }) => {
  const [status, setStatus] = useState();

  let content;

  if (new Date(task.dueDate) < new Date() && task.status !== "completed") {
    content = <OverDueTask task={task} />;
  } else if (task.status === "completed") {
    content = <CompleteTask task={task} />;
  } else if (task.status === "pending") {
    content = <PendingTask task={task} />;
  }

  return <>{content}</>;
};

export default Task;
