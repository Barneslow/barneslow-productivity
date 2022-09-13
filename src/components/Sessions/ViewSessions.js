import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SessionList from "./SessionList";
import styles from "./ViewSessions.module.css";

const ViewSessions = ({ status, setStatus }) => {
  const { sessions } = useSelector((state) => state.session);
  const [sessionArray, setSessionArray] = useState(sessions);

  useEffect(() => {
    if (status === "longest") {
      let filteredTasks = [];

      filteredTasks = [...sessionArray].sort((sessionA, sessionB) => {
        return sessionA.time > sessionB.time ? -1 : 1;
      });

      setSessionArray(filteredTasks);
    }

    if (status === "recent") {
      let filteredTasks = [];

      filteredTasks = [...sessionArray].sort((sessionA, sessionB) => {
        return sessionA.createdAt > sessionB.createdAt ? -1 : 1;
      });

      setSessionArray(filteredTasks);
    }

    if (status === "rated") {
      let filteredTasks = [];

      filteredTasks = [...sessionArray].sort((sessionA, sessionB) => {
        return sessionA.rating > sessionB.rating ? -1 : 1;
      });

      setSessionArray(filteredTasks);
    }
  }, [status, sessions]);

  return (
    <div className={styles.container}>
      <div className={styles.events}>
        <h2 className={styles.title}>Sessions</h2>
        <SessionList state={"preview"} sessionArray={sessionArray} />
      </div>
    </div>
  );
};

export default ViewSessions;
