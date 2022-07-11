import styles from "./Table.module.css";

const Table = (props) => {
  return (
    <div className={styles.sessions}>
      <div className={styles.header}>
        <h3>{props.header}</h3>
      </div>
      <div className={styles.row}>
        <h4 className={styles.title}>{props.field1}</h4>
        <h4 className={styles.title}>{props.field2}</h4>
        <h4 className={styles.title}>{props.field3}</h4>
      </div>
      {props.children}
    </div>
  );
};

export default Table;
