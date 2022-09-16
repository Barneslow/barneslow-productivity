import SessionDate from "../UI/FormattedDate";
import SessionTime from "./SessionTime";

import styles from "./SessionStats.module.css";
import DeleteSession from "./DeleteSession";
import { SessionBarChart, SessionRadialChart } from "../Data/ApexCharts";

const SessionStats = ({ session }) => {
  return (
    <div className={styles.container}>
      <SessionRadialChart time={session.time} />
      <SessionBarChart
        time={session.time}
        breakTime={session.breakTime}
        date={session.createdAt}
      />
    </div>
  );
};

export default SessionStats;
