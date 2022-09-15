import StarIcon from "@mui/icons-material/Star";

import styles from "./StarSlideDown.module.css";

const StarSlideDown = ({ rating }) => {
  let ratingArr = Array.from(Array(rating), (e, i) => {
    return (
      <StarIcon
        className={styles.icon}
        sx={{
          fontSize: { xs: 40, sm: 50 },
          color: "gold",
          stroke: "black",
          strokeWidth: 0.5,
        }}
      />
    );
  });

  return <div className={styles.ratings}>{ratingArr}</div>;
};

export default StarSlideDown;
