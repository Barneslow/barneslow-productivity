import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../Tasks/TaskInformation.module.css";
import UserSessions from "./UserSessions";
import ViewSessions from "./ViewSessions";

const SessionInformation = ({ setState, setValue }) => {
  const [status, setStatus] = useState();

  const changeStatusHandler = (status) => {
    console.log("fire");
    setStatus(status);
  };

  return (
    <div className={styles.container}>
      <ViewSessions status={status} setStatus={setStatus} />
      <UserSessions
        onClick={changeStatusHandler}
        setState={setState}
        setValue={setValue}
      />
    </div>
  );
};

export default SessionInformation;
