import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArchiveIcon from "@mui/icons-material/Archive";
import { Checkbox, Tooltip } from "@mui/material";
import { dateFormatter } from "../../utils/dateFormater";
import { formatDistance } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskAction } from "../../store/taskSlice";
import { useState } from "react";

import styles from "./Task.module.css";
import { guestActions } from "../../store/guestSlice";

const CompleteTask = ({ task, isLoggedInGuest }) => {
  const dispatch = useDispatch();
  const [taskArchive, setTaskArchive] = useState(task.isArchive);
  const { updateGuestTask } = useSelector(() => guestActions);

  let distanceSinceCompleted;

  if (task?.completedAt && !isLoggedInGuest) {
    distanceSinceCompleted = formatDistance(
      new Date(task?.createdAt),
      new Date(task?.completedAt),
      { includeSeconds: true }
    );
  }

  const handleChange = () => {
    const updatedTask = {
      completedAt: null,
      status: "pending",

      id: task.id,
    };

    isLoggedInGuest
      ? dispatch(updateGuestTask(updatedTask))
      : dispatch(updateTaskAction(updatedTask));
  };

  const handleArchive = () => {
    const addToArchive = {
      isArchive: !task.isArchive,
      id: task.id,
    };

    dispatch(updateTaskAction(addToArchive));

    setTaskArchive(!taskArchive);
  };

  const archiveColour = taskArchive ? "blue" : "darkgrey";

  return (
    <li className={`${styles.item} ${styles.completed}`}>
      <div className={styles.block}>
        <h3>{task.title}</h3>
      </div>
      <div className={styles.block}>
        <i className="icon checkmark green"></i>
      </div>
      <div className={styles.block}>
        <>
          <span className={styles.date}>Completed</span>
          {task?.completedAt ? (
            <h3>{dateFormatter(task?.completedAt)}</h3>
          ) : (
            <h3>{dateFormatter(new Date().getTime())}</h3>
          )}
        </>
      </div>
      <div className={styles.block}>
        <span className={styles.date}>Completed in:</span>
        <h3>{isLoggedInGuest ? "Login for data" : distanceSinceCompleted}</h3>
      </div>
      <div className={styles.block}>
        <Checkbox
          sx={{ padding: 0 }}
          checkedIcon={
            <CheckCircleIcon
              sx={{ color: "green", fontSize: { xs: 20, sm: 30, md: 40 } }}
            />
          }
          checked={true}
          onChange={handleChange}
        />
        <Tooltip title="Archive">
          <Checkbox
            sx={{ padding: 0 }}
            checkedIcon={
              <ArchiveIcon
                sx={{
                  color: archiveColour,
                  fontSize: { xs: 20, sm: 30, md: 40 },
                }}
              />
            }
            checked={true}
            onChange={handleArchive}
          />
        </Tooltip>
      </div>
    </li>
  );
};

export default CompleteTask;
