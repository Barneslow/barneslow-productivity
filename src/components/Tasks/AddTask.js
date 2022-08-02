import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTaskAction } from "../../store/taskSlice";
import BasicDatePicker from "../UI/DatePicker";
import styles from "./AddTask.module.css";

function AddTask(props) {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [dueDate, setdueDate] = useState();

  const saveTask = (e) => {
    e.preventDefault();

    const data = {
      description,
      dueDate,
    };

    dispatch(createTaskAction(data));
    props.onClose();
  };
  return (
    <form onSubmit={saveTask} className={styles.form}>
      <label className={styles.title} htmlFor="desc">
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
      <label className={styles.title} htmlFor="date">
        Date
      </label>
      <BasicDatePicker sendData={(date) => setdueDate(date)} />

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
