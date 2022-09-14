import React from "react";

import { secondsToHms } from "../../utils/secondsToHms";

import styles from "./StudyBlock.module.css";

const StudyBlock = (props) => {
  if (props.date) {
    const isoDate = new Date(props.date);

    const month = isoDate.toLocaleString("en-US", { month: "short" });
    const day = isoDate.toLocaleString("en-US", { day: "2-digit" });
    const year = isoDate.getFullYear();

    return (
      <div className={styles.container}>
        <div className={styles.block}>
          <div className={styles.date}>
            {month} {day}
          </div>
        </div>
        <div className={styles.year}>{year}</div>
      </div>
    );
  }

  if (props.time) {
    let { hours, minutes, seconds } = secondsToHms(props.time);

    return (
      <div className={`${styles["time-block"]}`}>
        <div className={styles.time}>
          {hours}:{minutes}:{seconds}
        </div>
      </div>
    );
  }
};

export default StudyBlock;
