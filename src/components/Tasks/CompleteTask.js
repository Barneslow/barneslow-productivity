import styles from "./CompleteTask.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Tooltip } from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import { Checkbox } from "@mui/material";
import { dateFormatter } from "../../utils/dateFormater";
import { formatDistance } from "date-fns";
import { useDispatch } from "react-redux";
import { updateTaskAction } from "../../store/taskSlice";
import { useState } from "react";

const CompleteTask = ({ onChangeState, task }) => {
  const dispatch = useDispatch();
  const [taskArchive, setTaskArchive] = useState(task.isArchive);

  let distanceSinceCompleted;

  if (task?.completedAt) {
    distanceSinceCompleted = formatDistance(
      new Date(task?.createdAt),
      new Date(task?.completedAt),
      { includeSeconds: true }
    );
  }

  const [completedIn, setCompletedIn] = useState(distanceSinceCompleted);

  const handleChange = () => {
    const updatedTask = {
      completedAt: null,
      status: "pending",
      id: task.id,
    };

    onChangeState("pending");
    dispatch(updateTaskAction(updatedTask));
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
    <li className={styles.item}>
      <div className={styles.block}>
        <h3>{task.description}</h3>
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
      <div className={`${styles.block} ${styles.created}`}>
        <>
          <span className={styles.date}>Completed in:</span>
          <h3>{completedIn}</h3>
        </>
      </div>
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
    </li>
  );
};

export default CompleteTask;
