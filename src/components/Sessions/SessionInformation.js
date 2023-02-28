import { useState } from "react";
import UserSessions from "./UserSessions";
import ViewSessions from "./ViewSessions";
import styles from "../Tasks/TaskInformation.module.css";
import { useSelector } from "react-redux";

const SessionInformation = ({ setState, setValue }) => {
  const [status, setStatus] = useState("recent");
  const { isLoggedInGuest } = useSelector((state) => state.auth);

  const changeStatusHandler = (status) => {
    setStatus(status);
  };

  return (
    <div className={styles.container}>
      <ViewSessions status={status} isLoggedInGuest={isLoggedInGuest} />
      <UserSessions
        onClick={changeStatusHandler}
        setState={setState}
        setValue={setValue}
        isLoggedInGuest={isLoggedInGuest}
      />
    </div>
  );
};

export default SessionInformation;
