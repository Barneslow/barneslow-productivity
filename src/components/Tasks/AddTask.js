import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTaskAction } from "../../store/taskSlice";
import { BasicDateTimePicker } from "../UI/DatePicker";
import styles from "./AddTask.module.scss";

function AddTask(props) {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const [dueTime, setDueTime] = useState();

  const saveTask = (e) => {
    e.preventDefault();

    const dueDate = dueTime?.$d;

    const data = {
      title,
      description,
      dueDate,
    };

    console.log(data);

    dispatch(createTaskAction(data));
    props.onClose();
  };
  return (
    <form onSubmit={saveTask} className={styles.form}>
      <div className={styles.block}>
        <label className={styles.label} htmlFor="title">
          Title
        </label>
        <input
          className={styles.title}
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className={styles.block}>
        <label className={styles.label} htmlFor="desc">
          Description
        </label>
        <textarea
          className={styles.description}
          type="text"
          name="desc"
          id="desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className={styles.block}>
        <label className={styles.deadline} htmlFor="date">
          Set A Deadline
        </label>
        <BasicDateTimePicker sendData={(date) => setDueTime(date)} />
      </div>

      <div className="ui buttons">
        <button className="ui negative button" onClick={props.onClose}>
          Cancel
        </button>
        <div className="or"></div>
        <button type="submit" className="ui positive button">
          Save
        </button>
      </div>
    </form>
  );
}

export default AddTask;
