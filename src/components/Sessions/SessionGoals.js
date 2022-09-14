import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import { Typography } from "@mui/material";

import styles from "./SessionGoals.module.css";
import { useSelector } from "react-redux";
import { secondsToMinutes } from "date-fns";

const SessionGoals = ({ rating, time }) => {
  const { sessionGoal } = useSelector((state) => state.user.user);

  const goal = secondsToMinutes(sessionGoal);
  return (
    <div className={styles.container}>
      <div className={styles.root}>
        <StarIcon
          sx={{ fontSize: { xs: 50, sm: 60 } }}
          className={styles.icon}
        />
        <Typography
          sx={{ fontWeight: 900, fontSize: { xs: "1rem", sm: "1.4rem" } }}
          className={styles.count}
        >
          {rating}
        </Typography>
      </div>
      <div className={styles.block}>
        {time > goal ? (
          <CheckCircleIcon
            sx={{ fontSize: { xs: 40, sm: 50 }, color: "green" }}
          />
        ) : (
          <DoDisturbIcon sx={{ fontSize: { xs: 40, sm: 50 }, color: "red" }} />
        )}
      </div>
    </div>
  );
};

export default SessionGoals;
