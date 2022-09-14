import { useState } from "react";
import UserSessions from "./UserSessions";
import ViewSessions from "./ViewSessions";
import styles from "../Tasks/TaskInformation.module.css";

const SessionInformation = ({ setState, setValue }) => {
  const [status, setStatus] = useState("recent");

  const changeStatusHandler = (status) => {
    setStatus(status);
  };

  return (
    <div className={styles.container}>
      <ViewSessions status={status} />
      <UserSessions
        onClick={changeStatusHandler}
        setState={setState}
        setValue={setValue}
      />
    </div>
  );
};

export default SessionInformation;
