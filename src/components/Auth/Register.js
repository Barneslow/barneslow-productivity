import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../store/authSlice";
import { Navigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import KeyIcon from "@mui/icons-material/Key";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { CountryDropdown } from "react-country-region-selector";

import styles from "./Login.module.css";

const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  userName: Yup.string().required("Username is required"),
  country: Yup.string().required("Country is required"),
});

const Register = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      userName: "",
      country: "",
    },
    validateOnChange: false,
    validateOnBlur: false,

    onSubmit: (values) => {
      console.log(values);
      // dispatch(registerUserAction(values));
    },
    validationSchema: formSchema,
  });

  const userData = useSelector((state) => state.authentication);

  const { loading, serverError, appError, userAuth } = userData;

  if (userAuth) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <h3 className={styles.title}>Register Account</h3>
      {appError || serverError ? (
        <h1 className={styles.error}>
          Hello
          {serverError} {appError}
        </h1>
      ) : null}
      <div className={styles["form-input"]}>
        <span>
          <PersonIcon />
        </span>
        <input
          value={formik.values.firstName}
          onChange={formik.handleChange("firstName")}
          onBlur={formik.handleBlur("firstName")}
          type="text"
          placeholder="First name?"
        />
      </div>
      <div className={styles.error}>{formik.errors.firstName}</div>
      <div className={styles["form-input"]}>
        <span>
          <PersonIcon />
        </span>
        <input
          value={formik.values.lastName}
          onChange={formik.handleChange("lastName")}
          onBlur={formik.handleBlur("lastName")}
          type="text"
          placeholder="Last name?"
        />
      </div>
      <div className={styles.error}>{formik.errors.lastName}</div>
      <div className={styles["form-input"]}>
        <span>
          <InsertEmoticonIcon />
        </span>
        <input
          value={formik.values.userName}
          onChange={formik.handleChange("userName")}
          onBlur={formik.handleBlur("userName")}
          type="text"
          placeholder="Choose a user name"
        />
      </div>
      <div className={styles.error}>{formik.errors.userName}</div>
      <div className={styles["form-input"]}>
        <span>
          <PublicIcon />
        </span>
        <CountryDropdown
          className={styles["country-selector"]}
          value={formik.values.country}
          onChange={formik.handleChange("country")}
        />
      </div>
      <div className={styles.error}>{formik.errors.country}</div>

      <div className={styles["form-input"]}>
        <span>
          <LockIcon />
        </span>
        <input
          value={formik.values.email}
          onChange={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          type="email"
          placeholder="Enter your email"
        />
      </div>
      <div className={styles.error}>{formik.errors.email}</div>
      <div className={styles["form-input"]}>
        <span>
          <KeyIcon />
        </span>
        <input
          value={formik.values.password}
          onChange={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          type="password"
          placeholder="Enter a password"
        />
      </div>
      <div className={styles.error}>{formik.errors.password}</div>
      {loading ? (
        <button disabled className={styles.loading}>
          Loading...
        </button>
      ) : (
        <button type="submit">Register</button>
      )}
    </form>
  );
};

export default Register;
