import styles from "./PendingTask.module.css";
import Moment from "react-moment";
import AddTaskIcon from "@mui/icons-material/AddTask";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Checkbox, IconButton } from "@mui/material";
import { dateFormatter } from "../../utils/dateFormater";
import { useDispatch } from "react-redux";
import { deleteTaskAction, updateTaskAction } from "../../store/taskSlice";

const PendingTask = ({ onChangeState, task }) => {
  const dispatch = useDispatch();

  const handleChange = () => {
    const updatedTask = {
      completedAt: new Date().getTime(),
      status: "completed",
      id: task.id,
    };

    onChangeState("completed");

    dispatch(updateTaskAction(updatedTask));
  };

  const deleteTaskHandler = () => {
    dispatch(deleteTaskAction(task.id));
  };

  return (
    <li className={styles.item}>
      <div className={styles.block}>
        <h3>{task.description}</h3>
      </div>
      <div className={styles.block}>
        <i className="sync icon yellow"></i>
      </div>
      <div className={styles.block}>
        <>
          <h3>{dateFormatter(task.dueDate)}</h3>
          <Moment className={styles.date} fromNow>
            {task.dueDate}
          </Moment>
        </>
      </div>
      <div className={`${styles.block} ${styles.created}`}>
        <>
          <h3>{dateFormatter(task.createdAt)}</h3>
          <Moment className={styles.date} fromNow>
            {task.createdAt}
          </Moment>
        </>
      </div>
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
    </li>
  );
};

export default PendingTask;
