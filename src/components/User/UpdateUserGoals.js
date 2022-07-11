import { useState } from "react";
import { PrettoSlider } from "../Timer/StyledSlider";

import styles from "./UpdateUserGoals.module.css";

const UpdateUserGoals = (props) => {
  const [workTime, setWorkTime] = useState(25);

  const setGoalHandler = (e, newValue) => {
    setWorkTime(newValue);
  };

  const logData = (e) => {
    e.preventDefault();

    props.onClose();
  };
  return (
    <form onSubmit={logData} className={styles.container}>
      <h1>Set Your Weekly Goal</h1>
      <p>(Time set in minutes)</p>

      <PrettoSlider
        step={15}
        defaultValue={60}
        min={15}
        max={720}
        marks
        value={workTime}
        onChange={setGoalHandler}
      />

      <h2 className={styles.title}>{workTime}: Minutes</h2>

      <div>
        <button type="button" onClick={props.onClose} className="ui red button">
          Cancel
        </button>
        <button type="submit" value="Submit" className="ui green button">
          Update Settings
        </button>
      </div>
    </form>
  );
};

export default UpdateUserGoals;
