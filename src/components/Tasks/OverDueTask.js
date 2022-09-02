import styles from "./OverDueTask.module.css";
import Moment from "react-moment";
import AddTaskIcon from "@mui/icons-material/AddTask";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Checkbox, IconButton, Tooltip } from "@mui/material";
import { dateFormatter } from "../../utils/dateFormater";
import { useDispatch } from "react-redux";
import { deleteTaskAction, updateTaskAction } from "../../store/taskSlice";

const OverDueTask = ({ onChangeState, task }) => {
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
        <i className="icon close red"></i>
      </div>
      <div className={styles.block}>
        <>
          <h3 className={styles.overdue}>OVERDUE</h3>
          <Moment className={styles.title} fromNow>
            {task.dueDate}
          </Moment>
        </>
      </div>
      <div className={styles.block}>
        <>
          <h3>{dateFormatter(task.createdAt)}</h3>
          <Moment className={styles.date} fromNow>
            {task.createdAt}
          </Moment>
        </>
      </div>
      <div>
        <Tooltip title="Edit Task">
          <Checkbox
            icon={
              <AddTaskIcon
                sx={{ color: "blue", fontSize: { sm: 30, md: 40 } }}
              />
            }
            checked={false}
            onChange={handleChange}
          />
        </Tooltip>
      </div>
      <Tooltip title="Delete Task">
        <IconButton onClick={deleteTaskHandler}>
          <DeleteForeverIcon
            sx={{ color: "red", fontSize: { sm: 30, md: 40 } }}
          />
        </IconButton>
      </Tooltip>
    </li>
  );
};

export default OverDueTask;
