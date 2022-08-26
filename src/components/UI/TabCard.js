import styles from "./TabCard.module.css";

const TabCard = (props) => {
  return (
    <section
      className={`${styles.card} ${props.className ? props.className : ""}`}
    >
      {props.children}
    </section>
  );
};

export default TabCard;
