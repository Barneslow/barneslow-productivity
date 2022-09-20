import * as Yup from "yup";
import { useFormik } from "formik";

import styles from "./ForgotPasswordForm.module.css";
import classes from "./LoginPage.module.css";

import { useDispatch, useSelector } from "react-redux";
import { passwordResetTokenAction } from "../../store/authSlice";

const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
});

const ForgotPasswordForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      dispatch(passwordResetTokenAction(values?.email));
    },

    validationSchema: formSchema,
  });

  const auth = useSelector((state) => state.auth);

  const { appError, serverError, loading, token } = auth;

  return (
    <section className={classes.container}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <h3 className={styles.title}>Forgot Your Password?</h3>

        {appError || serverError ? (
          <h3 className={styles.error}>{`${appError} ${serverError}`}</h3>
        ) : null}

        {token && (
          <h3 className={styles.success}>
            Password reset token sent to email!
          </h3>
        )}

        <div className={styles["form-input"]}>
          <input
            value={formik.values.email}
            onChange={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            type="email"
            placeholder="Enter email"
          />
        </div>
        <div className={styles.error}>{formik.errors.email}</div>

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

export default ForgotPasswordForm;
