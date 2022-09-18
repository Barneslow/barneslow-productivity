import styles from "./StyledIconButton.module.css";

const StyledIconButton = ({ children, onClick, status }) => {
  return (
    <button
      onClick={() => onClick(status)}
      className={`${styles.block} ${styles["block-hover"]}`}
    >
      {children}
    </button>
  );
};

export default StyledIconButton;
