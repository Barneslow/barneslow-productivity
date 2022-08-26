import * as Yup from "yup";
import { useFormik } from "formik";

import { useDispatch, useSelector } from "react-redux";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import styles from "./ChangePassword.module.css";
import PasswordView from "./PasswordView";
import { updateUserPassword } from "../../store/userSlice";

const formSchema = Yup.object({
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const ChangePassword = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    onSubmit: (values) => {
      dispatch(updateUserPassword(values));
    },
    validationSchema: formSchema,
  });

  const { user, loading, serverError, appError, userAuth } = userState;

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2 className={styles.title}>
        <span>
          <LockOpenIcon sx={{ fontSize: 25 }} />
        </span>{" "}
        Update Password
      </h2>

      <div className={styles["password-container"]}>
        <div className={styles.password}>
          <label
            className={
              formik.touched.password && formik.errors.password
                ? `${styles.error}`
                : `${styles.label}`
            }
          >
            Password
          </label>
          <PasswordView
            error={
              formik.touched.password && formik.errors.password ? true : false
            }
            value={formik.values.password}
            onChange={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
          />
          <div className={styles.error}>
            {formik.touched.password && formik.errors.password}
          </div>
        </div>

        <div className={styles.password}>
          <label
            className={
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? `${styles.error}`
                : `${styles.label}`
            }
          >
            Confirm Password
          </label>
          <PasswordView
            error={
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? true
                : false
            }
            value={formik.values.confirmPassword}
            onChange={formik.handleChange("confirmPassword")}
            onBlur={formik.handleBlur("confirmPassword")}
          />
          <div className={styles.error}>
            {formik.touched.confirmPassword && formik.errors.confirmPassword}
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

export default ChangePassword;
