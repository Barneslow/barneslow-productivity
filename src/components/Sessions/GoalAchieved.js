import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

import styles from "./GoalAchieved.module.css";
import { secondsToMinutes } from "date-fns";

const GoalAchieved = ({ goal, achieved }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {secondsToMinutes(goal)}mins Goal Achieved?
      </h2>
      <div className={styles.block}>
        {achieved ? (
          <ThumbUpIcon
            sx={{
              color: "green",
              fontSize: 100,
              stroke: "black",
              strokeWidth: 0.3,
            }}
          />
        ) : (
          <ThumbDownIcon
            sx={{
              color: "red",
              fontSize: 100,
              stroke: "black",
              strokeWidth: 0.3,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default GoalAchieved;
