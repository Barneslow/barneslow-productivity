import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../store/authSlice";
import { Navigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import KeyIcon from "@mui/icons-material/Key";
import PersonIcon from "@mui/icons-material/Person";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

import styles from "./Login.module.css";

const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  userName: Yup.string().required("Username is required"),
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
    },

    onSubmit: (values) => {
      console.log(values);
      dispatch(registerUserAction(values));
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
      <h3 className={styles.title}>Register For Your Account</h3>
      <div className={styles["form-input"]}>
        <span>
          <PersonIcon />
        </span>
        <input
          value={formik.values.firstName}
          onChange={formik.handleChange("firstName")}
          onBlur={formik.handleBlur("firstName")}
          className="w-full pr-6 pl-4 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
          type="text"
          placeholder="First name?"
        />
      </div>
      <div className={styles["form-input"]}>
        <span>
          <PersonIcon />
        </span>
        <input
          value={formik.values.lastName}
          onChange={formik.handleChange("lastName")}
          onBlur={formik.handleBlur("lastName")}
          className="w-full pr-6 pl-4 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
          type="text"
          placeholder="Last name?"
        />
      </div>
      <div className={styles["form-input"]}>
        <span>
          <InsertEmoticonIcon />
        </span>
        <input
          value={formik.values.userName}
          onChange={formik.handleChange("userName")}
          onBlur={formik.handleBlur("userName")}
          className="w-full pr-6 pl-4 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
          type="text"
          placeholder="Choose a user name"
        />
      </div>
      <div className={styles["form-input"]}>
        <span>
          <LockIcon />
        </span>
        <input
          value={formik.values.email}
          onChange={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          className="w-full pr-6 pl-4 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
          type="email"
          placeholder="Enter your email"
        />
      </div>
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
      <div className="text-red-400 mb-2"></div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
