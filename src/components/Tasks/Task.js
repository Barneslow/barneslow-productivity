import { useState } from "react";
import CompleteTask from "./CompleteTask";
import OverDueTask from "./OverDueTask";
import PendingTask from "./PendingTask";

const Task = ({ data }) => {
  const [currentState, setCurrentState] = useState(data.status);
  let task;

  const changeStateHandler = (state) => {
    setCurrentState(state);
  };

  if (new Date(data.dueDate) < new Date() && currentState !== "completed") {
    task = <OverDueTask task={data} onChangeState={changeStateHandler} />;
  } else if (currentState === "completed") {
    task = <CompleteTask task={data} onChangeState={changeStateHandler} />;
  } else if (currentState === "pending") {
    task = <PendingTask task={data} onChangeState={changeStateHandler} />;
  }

  return <>{task}</>;
};

export default Task;
