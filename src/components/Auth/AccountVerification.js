import Card from "../UI/Card";
import DoneIcon from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";
import styles from "./AccountVerification.module.css";
import {
  accountVerificationTokenAction,
  accountVerifiedAction,
} from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchUserAction } from "../../store/userSlice";

const AccountVerification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();

  const auth = useSelector((state) => state.auth);

  const { userAuth, loading, appError, serverError, isVerfied, verified } =
    auth;

  useEffect(() => {
    dispatch(accountVerifiedAction(token));
  }, [token, dispatch]);

  const navigateHandler = () => {
    dispatch(fetchUserAction(userAuth?.id));
    navigate("/");
  };

  return (
    <div className={styles.container}>
      {verified ? (
        <Card>
          <DoneIcon
            sx={{
              color: "green",
              fontSize: 50,
              border: 1,
              borderColor: "green",
              borderRadius: 50,
              background: "rgb(0, 160, 0, .3)",
            }}
          />
          <h2 className={styles.title}>Account Verified</h2>
          <p className={styles.text}>Thank you for verifiying your account.</p>
          <p className={styles.text}>Productivity awaits!</p>
          <button className={styles.button} onClick={navigateHandler}>
            Continue
          </button>
        </Card>
      ) : (
        <Card>
          <ErrorIcon
            sx={{
              color: "red",
              fontSize: 50,
              borderColor: "red",
              borderRadius: 50,
              background: "rgb(255, 0, 0, .15);",
            }}
          />
          <h2 className={styles.title}>Account Unverified</h2>
          <p className={styles.error}>{appError}</p>
          <p className={styles.error}>{serverError}</p>
          <button
            onClick={() => {
              dispatch(accountVerificationTokenAction());
            }}
            className={styles.button}
          >
            Retry
          </button>
        </Card>
      )}
    </div>
  );
};

export default AccountVerification;
