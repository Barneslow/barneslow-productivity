import { dateFormatter } from "../../utils/dateFormater";
import styles from "./SessionDate.module.css";

const SessionDate = ({ date }) => {
  const isoDate = new Date(date);
  const month = isoDate?.toLocaleString("en-US", { month: "long" });
  const day = isoDate?.toLocaleString("en-US", { day: "2-digit" });
  const year = isoDate?.getFullYear().toString();

  return (
    <div className={styles.container}>
      <h2 className={styles.month}>{month}</h2>
      <h2 className={styles.day}>{day}</h2>
      <h2 className={styles.year}>{year}</h2>
    </div>
  );
};

export default SessionDate;
