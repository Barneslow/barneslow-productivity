import { useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import InsightsIcon from "@mui/icons-material/Insights";
import { useState } from "react";

import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [regState, setRegState] = useState(true);

  const userData = useSelector((state) => state.auth);

  const { loading, serverError, appError, userAuth } = userData;

  if (userAuth || userData.isLoggedInGuest) {
    return <Navigate to="/" />;
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
      <div className={styles.copy}>
        <span>
          <InsightsIcon />
        </span>
        <h2>Ready to start?</h2>
        <h2> {regState ? "Login Now" : "Register Your Free Account"}</h2>
      </div>
    </section>
  );
};

export default LoginPage;
