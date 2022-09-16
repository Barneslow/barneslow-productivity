import styles from "./FormattedDate.module.css";

const FormattedDate = ({ date }) => {
  const isoDate = new Date(date);
  const month = isoDate?.toLocaleString("en-US", { month: "long" });
  const day = isoDate?.toLocaleString("en-US", { day: "2-digit" });
  const year = isoDate?.getFullYear().toString();

  return (
    <div className={styles.container}>
      {month} {day} {year}
    </div>
  );
};

export default FormattedDate;
