import React from "react";

import { secondsToHms } from "../../utils/secondsToHms";

import styles from "./StudyBlock.module.css";

const StudyBlock = (props) => {
  if (props.date) {
    const isoDate = new Date(props.date);

    const month = isoDate.toLocaleString("en-US", { month: "long" });
    const day = isoDate.toLocaleString("en-US", { day: "2-digit" });
    const year = isoDate.getFullYear();

    return (
      <div className={styles["session-date"]}>
        <div className={styles["expense-date__month"]}>{month}</div>
        <div className={styles["expense-date__day"]}>{day}</div>
        <div className={styles["expense-date__year"]}>{year}</div>
      </div>
    );
  }

  if (props.time) {
    let { hours, minutes, seconds } = secondsToHms(props.time);

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    return (
      <div className={`${styles["session-date"]} ${styles.time}`}>
        <div className={styles["expense-date__month"]}>Session Time</div>
        <div className={styles["expense-date__day"]}>
          {hours}:{minutes}:{seconds}
        </div>
      </div>
    );
  }
};

export default StudyBlock;
