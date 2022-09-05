import CheckoutItem from "./CheckoutItem";

import styles from "./Checkout.module.css";
import { useSelector } from "react-redux";

import PaymentForm from "./PaymentForm";

const Checkout = () => {
  const { cartItems, cartTotal } = useSelector((state) => state.emoji);

  return (
    <div className={styles["checkout-container"]}>
      <div className={styles["checkout-header"]}>
        <div className={styles["header-block"]}>
          <span>Product</span>
        </div>
        <div className={styles["header-block"]}>
          <span>Description</span>
        </div>

        <div className={styles["header-block"]}>
          <span>Price</span>
        </div>
        <div className={styles["header-block"]}>
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className={styles.total}>TOTAL: €{cartTotal.toFixed(2)}</div>
      <PaymentForm amount={cartTotal} />
    </div>
  );
};

export default Checkout;
