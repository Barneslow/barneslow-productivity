import ErrorIcon from "@mui/icons-material/Error";
import { useDispatch } from "react-redux";
import { accountVerificationTokenAction } from "../../store/authSlice";

import styles from "./VerificationAlert.module.css";

const AccountVerificationAlert = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <ErrorIcon sx={{ fontSize: 30 }} />
      <p>
        Your account is not verified.{" "}
        <button
          className={styles.button}
          onClick={() => dispatch(accountVerificationTokenAction())}
        >
          Click here to verify!
        </button>
      </p>
    </div>
  );
};

export default AccountVerificationAlert;
