import { useState } from "react";
import { useSelector } from "react-redux";
import { MonthlyLineChart } from "../Data/ApexCharts";
import SessionList from "../Sessions/SessionList";
import SessionStatsPreview from "../Sessions/SessionStatsPreview";

import styles from "./StatsContainer.module.css";

const StatsContainer = () => {
  const { sessions } = useSelector((state) => state.session);
  const [state, setState] = useState("");

  const months = [
    { month: "Jan", time: 0, breakTime: 0 },
    { month: "Feb", time: 0, breakTime: 0 },
    { month: "Mar", time: 0, breakTime: 0 },
    { month: "Apr", time: 0, breakTime: 0 },
    { month: "May", time: 0, breakTime: 0 },
    { month: "Jun", time: 0, breakTime: 0 },
    { month: "Jul", time: 0, breakTime: 0 },
    { month: "Aug", time: 0, breakTime: 0 },
    { month: "Sep", time: 0, breakTime: 0 },
    { month: "Oct", time: 0, breakTime: 0 },
    { month: "Nov", time: 0, breakTime: 0 },
    { month: "Dec", time: 0, breakTime: 0 },
  ];

  sessions.map((session) => {
    months.forEach((month) => {
      const sessionMonth = new Date(session.createdAt).toLocaleString("en-US", {
        month: "short",
      });
      if (sessionMonth === month.month) {
        month.time += session.time;
        month.breakTime += session.breakTime;
      }
    });
  });

  const stateHandler = (e) => {
    console.log(e);
    setState(e);
  };

  return (
    <div className={styles.container}>
      <div className={styles["inner-container"]}>
        {state.hasOwnProperty("_id") && <SessionStatsPreview session={state} />}
        {state === "" && <MonthlyLineChart sessions={months} />}
        <SessionList
          sessionArray={sessions}
          state={"full"}
          setState={stateHandler}
        />
      </div>
    </div>
  );
};

export default StatsContainer;
