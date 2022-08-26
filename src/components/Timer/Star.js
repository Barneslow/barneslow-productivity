import GradeIcon from "@mui/icons-material/Grade";
import { IconButton } from "@mui/material";

import styles from "./Star.module.css";

const Star = (props) => {
  if (props.rating) {
    return (
      <IconButton onClick={props.onClick}>
        <GradeIcon
          className={styles.star}
          sx={{ color: "gold", stroke: "black", strokeWidth: 1, fontSize: 30 }}
        />
      </IconButton>
    );
  } else {
    return (
      <IconButton onClick={props.onClick}>
        <GradeIcon
          className={styles.star}
          sx={{ color: "grey", stroke: "black", strokeWidth: 1, fontSize: 30 }}
        />
      </IconButton>
    );
  }
};

export default Star;
