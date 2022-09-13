import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import styles from "./Arrow.module.css";

const Save = ({ onClick }) => {
  return (
    <button type="submit" className={styles.save}>
      <CheckCircleIcon
        onClick={onClick}
        sx={{
          fontSize: { sm: 30, md: 40 },
        }}
      />
    </button>
  );
};

export default Save;
