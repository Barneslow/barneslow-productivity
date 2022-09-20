import styles from "./StyledBlock.module.css";

const StyledBlock = ({ title, value, icon }) => {
  return (
    <div className={styles.block}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.value}>
        {icon} {value}
      </div>
    </div>
  );
};

export default StyledBlock;
