import StarIcon from "@mui/icons-material/Star";

import styles from "./StarSlideDown.module.css";

const StarSlideDown = ({ rating }) => {
  let ratingArr = Array.from(Array(rating), (e, i) => {
    return (
      <StarIcon
        key={i}
        className={styles.icon}
        sx={{
          fontSize: { xs: 30, sm: 40, md: 60 },
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
