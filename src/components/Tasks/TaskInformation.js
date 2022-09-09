import TaskCalander from "../Calendar/TaskCalendar";
import UserTasks from "./UserTasks";

import styles from "./TaskInformation.module.css";
import { useState } from "react";
import ViewMoreBtn from "../UI/ViewMoreBtn";

const TaskInformation = () => {
  const [status, setStatus] = useState();

  const changeStatusHandler = (status) => {
    setStatus(status);
  };

  return (
    <div className={styles.container}>
      <TaskCalander status={status} setStatus={setStatus} />
      <UserTasks onClick={changeStatusHandler} />
    </div>
  );
};

export default TaskInformation;
