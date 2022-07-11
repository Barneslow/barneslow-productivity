import React from "react";

import styles from "./StatsBar.module.css";

const StatsBar = (props) => {
  let barFillHeight = "0%";

  let chartbarFill = "fill";
  let border = "1px solid black";

  if ((props.value / props.maxValue) * 100 < 50) {
    chartbarFill = "red";
    border = "1px solid";
  }

  if (props.maxValue > 0) {
    barFillHeight = Math.round((props.value / props.maxValue) * 100) + "%";
  }

  return (
    <div className={styles["chart-bar"]}>
      <div
        className={styles["chart-bar__inner"]}
        style={{ border: `${border}` }}
      >
        <div
          className={styles[chartbarFill]}
          style={{ height: barFillHeight }}
        ></div>
      </div>
      <div className={styles["chart-bar__label"]}>{props.label}</div>
      <h3 className={styles.stats}>{props.value}</h3>
    </div>
  );
};

export default StatsBar;
