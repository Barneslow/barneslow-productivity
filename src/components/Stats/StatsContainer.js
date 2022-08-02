import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./StatsContainer.module.css";
import StudySessionList from "../Study/StudySessionList";
import { GoalChart, MonthlyChart, WeeklyChart } from "./ApexCharts";

const StatsContainer = () => {
  const { sessions } = useSelector((state) => state.session);

  const [chart, setChart] = useState(<MonthlyChart />);

  const toggleChartHandler = (e) => {
    const buttonText = e.target.textContent;

    if (buttonText === "Weekly") {
      setChart(<WeeklyChart />);
    }

    if (buttonText === "Monthly") {
      setChart(<MonthlyChart />);
    }

    if (buttonText === "Goals") {
      setChart(<GoalChart />);
    }
  };

  return (
    <div className={styles["main-container"]}>
      {chart}
      <div className={styles["button-container"]}>
        <button className="ui button" onClick={toggleChartHandler}>
          Weekly
        </button>
        <button className="ui button" onClick={toggleChartHandler}>
          Monthly
        </button>
        <button className="ui button green" onClick={toggleChartHandler}>
          Goals
        </button>
      </div>
      <StudySessionList items={sessions} />
    </div>
  );
};

export default StatsContainer;
