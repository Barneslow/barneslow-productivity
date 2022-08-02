import * as Yup from "yup";
import { useFormik } from "formik";
import {
  hoursToSeconds,
  minutesToSeconds,
  secondsToHours,
  secondsToMinutes,
} from "date-fns/esm";
import { useState } from "react";
import { PrettoSlider } from "../Timer/StyledSlider";

import styles from "./UpdateUserGoals.module.css";
import { useDispatch } from "react-redux";
import { updateUserAction } from "../../store/userSlice";

const formSchema = Yup.object({
  goal: Yup.string().required("Goal tme is required"),
});

const UpdateUserWeeklyGoal = (props) => {
  const dispatch = useDispatch();
  const { goals, sessionGoal } = props.user;

  const hours = secondsToHours(goals);
  const minutes = secondsToMinutes(sessionGoal);

  const [workTime, setWorkTime] = useState(hours);
  const [sessionTime, setSessionTime] = useState(minutes);

  const setGoalHandler = (e, newValue) => {
    setWorkTime(newValue);
  };

  const setSessionGoalHandler = (e, newValue) => {
    console.log(newValue);
    setSessionTime(newValue);
  };

  const formik = useFormik({
    initialValues: {
      goal: props.user.goals,
    },

    onSubmit: (values) => {
      const data = {
        goals: hoursToSeconds(workTime),
        sessionGoal: minutesToSeconds(sessionTime),
      };

      console.log(data);

      dispatch(updateUserAction(data));
      props.onClose();
    },
    validationSchema: formSchema,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <h1>Set Your Weekly Goal</h1>
      <p>(Time set in hours)</p>

      <PrettoSlider
        step={0.25}
        min={0.25}
        max={60}
        value={workTime}
        onChange={setGoalHandler}
      />

      <h2 className={styles.title}>{workTime}: Hours</h2>

      <h1>Set Your Session Goal</h1>
      <p>(Time set in minutes)</p>

      <PrettoSlider
        step={15}
        min={15}
        max={480}
        value={sessionTime}
        onChange={setSessionGoalHandler}
      />

      <h2 className={styles.title}>{sessionTime}: Minutes</h2>

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

export default UpdateUserWeeklyGoal;
