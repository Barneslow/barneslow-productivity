import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectTimerLog, timerActions } from "../../store/timerSlice";
import styles from "./StatsContainer.module.css";

import StudyLog from "../Study/StudyLog";
import { GoalChart, MonthlyChart, WeeklyChart } from "./ApexCharts";

const DUMMY_DATA = [
  {
    id: "e1",
    time: 5400,
    date: new Date(2020, 7, 14).toISOString(),
  },
  { id: "e2", time: 1800, date: new Date(2021, 2, 12).toISOString() },
  {
    id: "e3",
    time: 3000,
    date: new Date(2021, 2, 28).toISOString(),
  },
];

const StatsContainer = () => {
  const dispatch = useDispatch();
  const dataLog = useSelector(selectTimerLog);
  const [chart, setChart] = useState(<MonthlyChart />);

  if (dataLog.length < 3) {
    dispatch(timerActions.saveSession(DUMMY_DATA));
  }

  useEffect(() => {
    if (dataLog.length === 0) return;

    dispatch(timerActions.saveSession(dataLog));
  }, [dataLog]);

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
      <StudyLog items={dataLog} />
    </div>
  );
};

export default StatsContainer;
