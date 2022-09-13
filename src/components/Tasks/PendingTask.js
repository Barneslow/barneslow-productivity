import Moment from "react-moment";
import AddTaskIcon from "@mui/icons-material/AddTask";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

import { Checkbox, IconButton, Tooltip } from "@mui/material";
import { dateFormatter } from "../../utils/dateFormater";
import { useDispatch } from "react-redux";
import { deleteTaskAction, updateTaskAction } from "../../store/taskSlice";
import { useState } from "react";
import EditTask from "./EditTask";

import styles from "./Task.module.css";

const PendingTask = ({ task }) => {
  const dispatch = useDispatch();
  const [taskArchive, setTaskArchive] = useState(task.isArchive);
  const [isEditing, setIsEditing] = useState(false);
  const [viewDescription, setViewDescription] = useState(false);

  const archiveColour = taskArchive ? "blue" : "darkgrey";

  const handleChange = () => {
    const updatedTask = {
      completedAt: new Date().getTime(),
      status: "completed",
      id: task.id,
    };

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

  const editTaskHandler = () => {
    setIsEditing(true);
  };

  const cancelEditHandler = () => {
    setIsEditing(false);
  };

  const deleteTaskHandler = () => {
    dispatch(deleteTaskAction(task.id));
  };

  return (
    <li className={`${styles.item} ${styles.pending}`}>
      {!isEditing && (
        <>
          <div className={styles.container}>
            <div className={styles.block}>
              <h3>{task.title}</h3>
            </div>
            <div className={styles.block}>
              <i className="sync icon yellow" />
            </div>
            <div className={styles.block}>
              <h3>{dateFormatter(task.dueDate)}</h3>
              <Moment className={styles.date} fromNow>
                {task.dueDate}
              </Moment>
            </div>
            <div className={styles.block}>
              <h3>{dateFormatter(task.createdAt)}</h3>
              <Moment className={styles.date} fromNow>
                {task.createdAt}
              </Moment>
            </div>
            <div className={styles.edit}>
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
              <div className={styles.button}>
                <IconButton onClick={editTaskHandler} sx={{ padding: 0 }}>
                  <EditIcon
                    sx={{
                      color: "yellow",
                      stroke: "black",
                      fontSize: { xs: 20, sm: 30, md: 40 },
                    }}
                  />
                </IconButton>
              </div>
              <div className={styles.button}>
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
              <div className={styles.button}>
                <IconButton sx={{ padding: 0 }} onClick={deleteTaskHandler}>
                  <DeleteForeverIcon
                    sx={{
                      color: "red",
                      fontSize: { xs: 20, sm: 30, md: 40 },
                    }}
                  />
                </IconButton>
              </div>
            </div>
          </div>
          {viewDescription ? (
            <div className={styles["description-container"]}>
              <KeyboardDoubleArrowUpIcon
                className={styles.view}
                onClick={() => setViewDescription(!viewDescription)}
              />

              <div className={styles.description}>
                <p>{task.description}</p>
              </div>
            </div>
          ) : (
            <KeyboardDoubleArrowDownIcon
              className={styles.view}
              onClick={() => setViewDescription(!viewDescription)}
            />
          )}
        </>
      )}
      {isEditing && (
        <div className={styles.container}>
          <EditTask task={task} cancelEdit={cancelEditHandler} />
        </div>
      )}
    </li>
  );
};

export default PendingTask;
