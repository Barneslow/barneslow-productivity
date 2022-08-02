import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { loginUserAction } from "../../store/authSlice";

import LockIcon from "@mui/icons-material/Lock";
import KeyIcon from "@mui/icons-material/Key";

import styles from "./Login.module.css";

const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(loginUserAction(values));
    },
    validationSchema: formSchema,
  });
  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <h3 className={styles.title}>Login to your Account</h3>
      <div className={styles["form-input"]}>
        <span>
          <LockIcon />
        </span>
        {/* Email */}
        <input
          value={formik.values.email}
          onChange={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          className="w-full pr-6 pl-4 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
          type="email"
          placeholder="Enter email"
        />
      </div>
      {/* Err message */}
      <div className={styles["form-input"]}>
        <span>
          <KeyIcon />
        </span>
        {/* Password */}
        <input
          value={formik.values.password}
          onChange={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          type="password"
          placeholder=" Password"
        />
      </div>
      {/* Err msg */}
      <div className="text-red-400 mb-2"></div>
      {/* Login btn */}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
