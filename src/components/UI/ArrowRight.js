import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

import styles from "./Arrow.module.css";

const ArrowRight = ({ onClick }) => {
  return (
    <div className={styles.right}>
      <ArrowCircleRightIcon
        onClick={onClick}
        sx={{
          fontSize: { xs: 20, sm: 30, md: 40 },
        }}
      />
    </div>
  );
};

export default ArrowRight;
