import { useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

import InsightsIcon from "@mui/icons-material/Insights";
import styles from "./Login.module.css";
import { useState } from "react";

const LoginPage = () => {
  const [regState, setRegState] = useState(true);

  const userData = useSelector((state) => state.authentication);

  const { loading, serverError, appError, userAuth } = userData;

  if (userAuth) {
    return <Navigate to="/dashboard" />;
  }

  const changeRegStateHandler = () => {
    setRegState(!regState);
  };
  return (
    <section className={styles.container}>
      <div>
        <img className="" src="" alt="" />
      </div>
      <div>
        <div>
          {regState ? <Login /> : <Register />}
          <div className={styles.register}>
            <Link to="/forgot-password">Forgot Password?</Link>
            <button onClick={changeRegStateHandler}>
              {regState ? "Register Now" : "Login to your account"}
            </button>
          </div>
        </div>
      </div>
      <div className={styles.copywrite}>
        <span>
          <InsightsIcon />
        </span>
        <h2>Ready to start?</h2>
        <h2>Login Now!</h2>
      </div>
    </section>
  );
};

export default LoginPage;
