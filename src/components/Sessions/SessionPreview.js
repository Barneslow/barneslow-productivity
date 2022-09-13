import { secondsToHms } from "../../utils/secondsToHms";
import StarIcon from "@mui/icons-material/Star";
import { Typography } from "@mui/material";

import styles from "./SessionPreview.module.css";

const SessionPreview = ({ session }) => {
  const isoDate = new Date(session.createdAt);

  console.log(session);

  let { hours, minutes, seconds } = secondsToHms(session.time);

  const month = isoDate?.toLocaleString("en-US", { month: "long" });
  const day = isoDate?.toLocaleString("en-US", { day: "2-digit" });

  return (
    <div className={styles.study}>
      <div className={styles.block}>
        <h3>
          {day} {month}
        </h3>
      </div>
      <div className={styles.block}>
        <h3>
          {hours}:{minutes}:{seconds}
        </h3>
      </div>
      <div className={styles.block}>
        <div className={styles.root}>
          <StarIcon
            sx={{ fontSize: { xs: 50, sm: 60 } }}
            className={styles.icon}
          />
          <Typography
            sx={{ fontWeight: 900, fontSize: "1.4rem" }}
            className={styles.count}
          >
            {session.rating}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default SessionPreview;
