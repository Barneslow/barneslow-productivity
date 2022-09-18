import styles from "./SessionGraphs.module.css";
import DeleteSession from "./DeleteSession";
import { SessionBarChart, SessionRadialChart } from "../Data/ApexCharts";

const SessionGraphs = ({ session }) => {
  return (
    <div className={styles.container}>
      <SessionRadialChart time={session.time} fill={true} />
      {/* <SessionBarChart
        time={session.time}
        breakTime={session.breakTime}
        date={session.createdAt}
      /> */}
    </div>
  );
};

export default SessionGraphs;
