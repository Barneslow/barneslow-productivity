import styles from "./CartItem.module.css";

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className={styles.container}>
      <img src={imageUrl} alt={`${name}`} />
      <div className={styles.details}>
        <span>{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
