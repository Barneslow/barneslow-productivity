import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

import styles from "./Arrow.module.css";

const ArrowRight = ({ onClick }) => {
  return (
    <div className={styles.right}>
      <ArrowCircleRightIcon
        onClick={onClick}
        sx={{
          fontSize: { xs: 30, sm: 40 },
        }}
      />
    </div>
  );
};

export default ArrowRight;
