import Moment from "react-moment";
import AddTaskIcon from "@mui/icons-material/AddTask";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Checkbox, IconButton } from "@mui/material";
import { dateFormatter } from "../../utils/dateFormater";
import { useDispatch, useSelector } from "react-redux";
import { deleteTaskAction, updateTaskAction } from "../../store/taskSlice";

import styles from "./Task.module.css";
import { guestActions } from "../../store/guestSlice";

const OverDueTask = ({ task, isLoggedInGuest }) => {
  const dispatch = useDispatch();
  const { updateGuestTask } = useSelector(() => guestActions);

  const handleChange = () => {
    const updatedTask = {
      completedAt: new Date().getTime(),
      status: "completed",
      id: task.id,
    };

    isLoggedInGuest
      ? dispatch(updateGuestTask(updatedTask))
      : dispatch(updateTaskAction(updatedTask));
  };

  const deleteTaskHandler = () => {
    dispatch(deleteTaskAction(task.id));
  };

  return (
    <li className={`${styles.item} ${styles.overdue}`}>
      <div className={styles.block}>
        <h3>{task.title}</h3>
      </div>
      <div className={styles.block}>
        <i className="icon close red"></i>
      </div>
      <div className={styles.block}>
        <h3 className={styles["overdue-title"]}>OVERDUE</h3>
        <Moment className={styles["past-due"]} fromNow>
          {task.dueDate}
        </Moment>
      </div>
      <div className={styles.block}>
        <h3>{dateFormatter(task.createdAt)}</h3>
        <Moment className={styles.date} fromNow>
          {task.createdAt}
        </Moment>
      </div>
      <div className={styles.block}>
        <Checkbox
          sx={{ padding: 0 }}
          icon={
            <AddTaskIcon
              sx={{ color: "blue", fontSize: { xs: 20, sm: 30, md: 40 } }}
            />
          }
          checked={false}
          onChange={handleChange}
        />
        <IconButton sx={{ padding: 0 }} onClick={deleteTaskHandler}>
          <DeleteForeverIcon
            sx={{ color: "red", fontSize: { xs: 20, sm: 30, md: 40 } }}
          />
        </IconButton>
      </div>
    </li>
  );
};

export default OverDueTask;
