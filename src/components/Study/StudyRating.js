import StarIcon from "@mui/icons-material/Star";
import { Typography } from "@mui/material";

import styles from "./StudyRating.module.css";

const StudyRating = ({ rating }) => {
  return (
    <div className={styles.ratings}>
      <h3 className={styles.title}>Rating</h3>
      <div className={styles.root}>
        <StarIcon sx={{ fontSize: 50 }} className={styles.icon} />
        <Typography sx={{ fontWeight: 900 }} className={styles.count}>
          {rating}
        </Typography>
      </div>
    </div>
  );
};

export default StudyRating;
