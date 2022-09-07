import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { sessionTimeSinceMonday } from "../../utils/sessionTimeSinceMonday";
import StudySessionList from "../Study/StudySessionList";
import { GoalChart, MonthlyChart, WeeklyChart } from "./ApexCharts";

import styles from "./StatsContainer.module.css";

const StatsContainer = () => {
  const { sessions } = useSelector((state) => state.session);
  const [weeklyBtn, setWeeklyBtn] = useState(false);
  const [monthlyBtn, setMonthlyBtn] = useState(true);
  const [goalBtn, setGoalBtn] = useState(false);

  let totalTime;
  if (sessions?.length > 0) {
    totalTime = sessionTimeSinceMonday(sessions);
  } else {
    totalTime = 0;
  }

  const [chart, setChart] = useState(<MonthlyChart sessions={sessions} />);

  const toggleChartHandler = (e) => {
    const buttonText = e.target.textContent;

    if (buttonText === "Weekly") {
      setWeeklyBtn(!weeklyBtn);
      setMonthlyBtn(false);
      setGoalBtn(false);

      setChart(<WeeklyChart sessions={sessions} />);
    }

    if (buttonText === "Monthly") {
      setWeeklyBtn(!monthlyBtn);
      setMonthlyBtn(false);
      setGoalBtn(false);

      setChart(<MonthlyChart sessions={sessions} />);
    }

    if (buttonText === "Goals") {
      setGoalBtn(!goalBtn);
      setWeeklyBtn(false);
      setMonthlyBtn(false);
      setChart(<GoalChart sessions={sessions} totalTime={totalTime} />);
    }
  };

  return (
    <div className={styles["main-container"]}>
      {chart}
      <div className={styles["button-container"]}>
        <button
          className={
            weeklyBtn ? `${styles.button} ${styles.active}` : `${styles.button}`
          }
          onClick={toggleChartHandler}
        >
          Weekly
        </button>
        <button
          className={
            monthlyBtn
              ? `${styles.button} ${styles.active}`
              : `${styles.button}`
          }
          onClick={toggleChartHandler}
        >
          Monthly
        </button>
        <button
          className={
            goalBtn ? `${styles.button} ${styles.active}` : `${styles.button}`
          }
          onClick={toggleChartHandler}
        >
          Goals
        </button>
      </div>
      <StudySessionList items={sessions} />
    </div>
  );
};

export default StatsContainer;
