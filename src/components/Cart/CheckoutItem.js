import { useDispatch } from "react-redux";
import { emojiActions } from "../../store/emojiSlice";
import styles from "./CheckoutItem.module.scss";

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { name, source, price, quantity } = cartItem;

  const clearItemHandler = () =>
    dispatch(emojiActions.clearItemFromCart(cartItem));

  return (
    <div className={styles["checkout-item-container"]}>
      <div className={styles["image-container"]}>
        <img src={source} alt={`${name}`} />
      </div>
      <span className={styles.name}> {name} </span>

      <span className={styles.price}> {price}</span>
      <div className={styles["remove-button"]} onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
