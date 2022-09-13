import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

import styles from "./Arrow.module.css";

const ArrowLeft = ({ onClick }) => {
  return (
    <div className={styles.left}>
      <ArrowCircleLeftIcon
        onClick={onClick}
        sx={{
          fontSize: { xs: 30, sm: 40 },
        }}
      />
    </div>
  );
};

export default ArrowLeft;
