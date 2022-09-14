import { useState } from "react";
import { useSelector } from "react-redux";
import { sessionTimeSinceMonday } from "../../utils/sessionTimeSinceMonday";
import {
  MonthlyChart,
  MonthlyLineChart,
  WeeklyChart,
} from "../Data/ApexCharts";
import SessionList from "../Sessions/SessionList";

import styles from "./StatsContainer.module.css";

const StatsContainer = () => {
  const { sessions } = useSelector((state) => state.session);
  const [state, setState] = useState("");

  const stateHandler = (e) => {
    console.log(e);
    setState(e);
  };

  return (
    <div className={styles.container}>
      <div className={styles["inner-container"]}>
        {state.hasOwnProperty("_id") && <h1>Testing the state</h1>}{" "}
        {state === "" && <MonthlyChart sessions={sessions} />}
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
