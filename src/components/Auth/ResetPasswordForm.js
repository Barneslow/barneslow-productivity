import * as Yup from "yup";
import { useFormik } from "formik";

import styles from "./ForgotPasswordForm.module.css";
import classes from "./LoginPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  passwordResetTokenAction,
  resetPasswordAction,
} from "../../store/authSlice";
import { useParams } from "react-router-dom";
import { updateUserPassword } from "../../store/userSlice";

const formSchema = Yup.object({
  password: Yup.string().required("Email is required"),
});

const ResetPasswordForm = () => {
  const { token } = useParams();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      password: "",
      token: "",
    },
    onSubmit: (values) => {
      const data = {
        password: values?.password,
        token,
      };
      dispatch(resetPasswordAction(data));
    },

    validationSchema: formSchema,
  });

  const auth = useSelector((state) => state.authentication);

  const { appError, serverError, loading, passwordReset } = auth;

  return (
    <section className={classes.container}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <h3 className={styles.title}>Reset Your Password?</h3>

        {appError || serverError ? (
          <h3 className={styles.error}>{`${appError} ${serverError}`}</h3>
        ) : null}

        <div className={styles["form-input"]}>
          <input
            value={formik.values.password}
            onChange={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
            type="password"
            placeholder="Enter password"
          />
        </div>
        <div className={styles.error}>{formik.errors.password}</div>

        {loading ? (
          <button disabled type="submit">
            Sending...
          </button>
        ) : (
          <button type="submit">Reset Password</button>
        )}
      </form>
    </section>
  );
};

export default ResetPasswordForm;
