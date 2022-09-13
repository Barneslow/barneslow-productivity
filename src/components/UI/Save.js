import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import styles from "./Arrow.module.css";

const Save = ({ onClick }) => {
  return (
    <button type="submit" className={styles.save}>
      <CheckCircleIcon
        onClick={onClick}
        sx={{
          fontSize: { xs: 30, sm: 40 },
        }}
      />
    </button>
  );
};

export default Save;
