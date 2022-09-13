import { Checkbox } from "@mui/material";
import { dateFormatterMonthDay } from "../../utils/dateFormater";
import AddTaskIcon from "@mui/icons-material/AddTask";

import styles from "./TaskPreview.module.css";
import { useDispatch } from "react-redux";
import { updateTaskAction } from "../../store/taskSlice";

const TaskPreview = ({ task }) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const status = task.status === "pending" ? "completed" : "pending";
    const completedAt = task.status === "pending" ? new Date().getTime() : null;

    const updatedTask = {
      completedAt,
      status,
      id: task.id,
    };

    dispatch(updateTaskAction(updatedTask));
  };

  let statusClass;
  let statusIcon;
  if (task.status === "pending") {
    statusClass = `${styles.blue}`;
    statusIcon = <i className="sync icon yellow" />;
  }
  if (task.status === "completed") {
    statusClass = `${styles.green}`;
    statusIcon = <i className="icon checkmark green"></i>;
  }

  if (new Date(task.dueDate) < new Date() && task.status !== "completed") {
    statusClass = `${styles.red}`;
    statusIcon = <i className="icon close red"></i>;
  }

  return (
    <div className={`${styles.container} ${statusClass}`}>
      <div className={styles.block}>{task.title}</div>
      <div className={styles.block}>{statusIcon}</div>
      <div className={styles.block}>{dateFormatterMonthDay(task.dueDate)}</div>
      <div className={styles.block}>
        {dateFormatterMonthDay(task.createdAt)}
      </div>

      <div className={styles.block}>
        <div className={styles.button}>
          <Checkbox
            sx={{ padding: 0 }}
            icon={
              <AddTaskIcon
                sx={{
                  color: "blue",
                  fontSize: { xs: 20, sm: 30, md: 40 },
                }}
              />
            }
            checked={false}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskPreview;
