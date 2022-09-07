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
  weeklyGoal: Yup.number().required("Weekly goal time is required"),
  sessionGoal: Yup.number().required("Session goal time is required"),
});

const UpdateUserWeeklyGoal = (props) => {
  const dispatch = useDispatch();
  const { weeklyGoal, sessionGoal } = props.user;

  const hours = secondsToHours(weeklyGoal);
  const minutes = secondsToMinutes(sessionGoal);

  const [workTime, setWorkTime] = useState(hours);
  const [sessionTime, setSessionTime] = useState(minutes);

  const setGoalHandler = (e, newValue) => {
    setWorkTime(newValue);
    formik.handleChange("weeklyGoal");

    formik.values.weeklyGoal = newValue;
  };

  const setSessionGoalHandler = (e, newValue) => {
    setSessionTime(newValue);

    formik.handleChange("sessionGoal");

    formik.values.sessionGoal = newValue;
  };

  const formik = useFormik({
    initialValues: {
      weeklyGoal: hours,
      sessionGoal: minutes,
    },

    onSubmit: (values) => {
      const data = {
        weeklyGoal: hoursToSeconds(workTime),
        sessionGoal: minutesToSeconds(sessionTime),
      };


      dispatch(updateUserAction(data));
      props.onClose();
    },
    validationSchema: formSchema,
  });
  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <div className={styles["settings-container"]}>
        <div className={styles.settings}>
          <h2>Set Your Weekly Goal</h2>
          <p>(Time set in hours)</p>
        </div>

        <PrettoSlider
          step={0.25}
          min={0.25}
          max={60}
          value={formik.values.weeklyGoal}
          onChange={setGoalHandler}
        />

        <h2 className={styles.title}>{workTime}: Hours</h2>
      </div>

      <div className={styles["settings-container"]}>
        <div className={styles.settings}>
          <h2>Set Your Session Goal</h2>
          <p>(Time set in minutes)</p>
        </div>

        <PrettoSlider
          step={15}
          min={15}
          max={240}
          value={formik.values.sessionGoal}
          onChange={setSessionGoalHandler}
        />

        <h2 className={styles.title}>{sessionTime}: Minutes</h2>
      </div>

      <div className={styles["button-box"]}>
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
