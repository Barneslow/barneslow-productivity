import styles from "./TableRow.module.css";

const TableRow = ({ selectable, data }) => {
  let className = styles.row;
  let status = data?.status;

  if (selectable) {
    className = `${styles.row} ${styles.selectable}`;
  }
  if (data?.status?.state === "overdue") {
    status = <i className="icon close red"></i>;
  }
  if (data?.status?.state === "pending") {
    status = <i className="sync icon yellow"></i>;
  }
  if (data?.status?.state === "completed") {
    status = <i className="icon checkmark black"></i>;
    className = `${styles.row} ${styles.green}`;
  }

  let icon;
  if (data?.date?.icon) {
    icon = <i className="icon checkmark green"></i>;
  }

  const handleClick = (e) => {
    console.log("fire");
  };
  return (
    <div className={className} onClick={handleClick}>
      <h4 className={styles.goals}>{data?.description}</h4>
      <h4 className={styles.goals}>
        {status}
        {data?.status?.amount}
      </h4>
      <h4 className={styles.goals}>
        {icon}
        {data?.date?.amount}
      </h4>
    </div>
  );
};

export default TableRow;
