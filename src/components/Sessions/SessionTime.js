import { useDispatch, useSelector } from "react-redux";
import { SessionBarChart, SessionRadialChart } from "../Stats/ApexCharts";
import Card from "../UI/Card";

import styles from "./SessionTime.module.css";

const SessionTime = ({ time, breakTime, date }) => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state.authentication);


  return (
    <Card>
      {time && breakTime && (
        <div className={styles["chart-container"]}>
          <SessionRadialChart time={time} breakTime={breakTime} />
          <SessionBarChart time={time} breakTime={breakTime} date={date} />
        </div>
      )}
    </Card>
  );
};

export default SessionTime;
