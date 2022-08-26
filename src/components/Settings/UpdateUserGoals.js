import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { updateUserAction } from "../../store/userSlice";

import QueryStatsIcon from "@mui/icons-material/QueryStats";

import styles from "./UpdateUserGoals.module.css";
import { minutesToSeconds, secondsToMinutes } from "date-fns";

const formSchema = Yup.object({
  weeklyGoal: Yup.string().required("Username is required"),
  sessionGoal: Yup.string().required("Email is required"),
});

const UpdateUserGoals = () => {
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);

  const { user, loading, serverError, appError, userAuth } = userState;

  const formik = useFormik({
    initialValues: {
      weeklyGoal: secondsToMinutes(user?.weeklyGoal),
      sessionGoal: secondsToMinutes(user?.sessionGoal),
    },

    onSubmit: (values) => {
      const data = {
        weeklyGoal: minutesToSeconds(values?.weeklyGoal),
        sessionGoal: minutesToSeconds(values?.sessionGoal),
      };
      dispatch(updateUserAction(data));
    },
    validationSchema: formSchema,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <h2 className={styles.title}>
        <span>
          <QueryStatsIcon sx={{ fontSize: 25 }} />
        </span>{" "}
        Update Goals
      </h2>
      <div className="ui equal width form">
        <div className="fields">
          <div className="field">
            <label>Weekly Goal (minutes)</label>
            <input
              value={formik.values.weeklyGoal}
              onChange={formik.handleChange("weeklyGoal")}
              onBlur={formik.handleBlur("weeklyGoal")}
              type="number"
              step="15"
            />
          </div>
          <div className="field">
            <label>Session Goal (minutes)</label>
            <input
              value={formik.values.sessionGoal}
              onChange={formik.handleChange("sessionGoal")}
              onBlur={formik.handleBlur("sessionGoal")}
              type="number"
              step="15"
            />
          </div>
        </div>
      </div>
      {loading ? (
        <button disabled className="positive ui button">
          Updating...
        </button>
      ) : (
        <button type="submit" className="positive ui button">
          Submit
        </button>
      )}
    </form>
  );
};

export default UpdateUserGoals;
