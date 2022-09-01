import styles from "./CartItem.module.css";

const CartItem = ({ cartItem }) => {
  const { name, source, price } = cartItem;
  return (
    <div className={styles.container}>
      <img src={source} alt={`${name}`} />
      <div className={styles.details}>
        <span>{name}</span>
        <span>€{price}</span>
      </div>
    </div>
  );
};

export default CartItem;
