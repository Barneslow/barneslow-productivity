import CheckoutItem from "./CheckoutItem";

import styles from "./Checkout.module.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import PaymentForm from "./PaymentForm";

const Checkout = () => {
  const [cartTotal, setCartTotal] = useState(0);
  const { cartItems } = useSelector((state) => state.emoji);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (acc, cartItem) => cartItem.price + acc,
      0
    );
    setCartTotal(newCartTotal.toFixed(2));
  }, [cartItems]);

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
      <div className={styles.total}>TOTAL: €{cartTotal}</div>
      <PaymentForm amount={cartTotal * 100} />{" "}
    </div>
  );
};

export default Checkout;
