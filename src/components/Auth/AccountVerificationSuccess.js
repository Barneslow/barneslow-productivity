import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import styles from "./AccountVerificationSuccess.module.css";

const AccountVerificationSuccess = () => {
  return (
    <div className={styles.container}>
      <CheckCircleIcon sx={{ fontSize: 30 }} />
      <p>Email is successfully sent to your Email</p>
    </div>
  );
};

export default AccountVerificationSuccess;
