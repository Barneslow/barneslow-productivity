import StarIcon from "@mui/icons-material/Star";
import { IconButton } from "@mui/material";

import styles from "./Star.module.css";

const Star = ({ rating, onClick }) => {
  if (rating) {
    return (
      <IconButton onClick={onClick}>
        <StarIcon
          className={styles.star}
          sx={{
            color: "#ffc23a",
            stroke: "black",
            strokeWidth: 0.3,
            fontSize: 50,
          }}
        />
      </IconButton>
    );
  } else {
    return (
      <IconButton onClick={onClick}>
        <StarIcon
          className={styles.star}
          sx={{
            color: "lightgrey",
            stroke: "black",
            strokeWidth: 0.3,
            fontSize: 50,
          }}
        />
      </IconButton>
    );
  }
};

export default Star;
