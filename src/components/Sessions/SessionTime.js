import { SessionBarChart, SessionRadialChart } from "../Data/ApexCharts";

import styles from "./SessionTime.module.css";

const SessionTime = ({ time, breakTime, date }) => {
  return (
    <div className={styles.container}>
      {time && breakTime && (
        <div className={styles["chart-container"]}>
          <SessionRadialChart time={time} breakTime={breakTime} />
          <SessionBarChart time={time} breakTime={breakTime} date={date} />
        </div>
      )}
    </div>
  );
};

export default SessionTime;
