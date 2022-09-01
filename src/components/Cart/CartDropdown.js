import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CartItem from "./CartItem";

import styles from "./CartDropdown.module.css";

const CartDropdown = () => {
  const { cartItems } = useSelector((state) => state.emoji);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <div className={styles["cart-dropdown-container"]}>
      <div className={styles["cart-items"]}>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <h2 className={styles.empty}>Your cart is empty</h2>
        )}
      </div>
      <button className="positive ui button" onClick={goToCheckoutHandler}>
        GO TO CHECKOUT
      </button>
    </div>
  );
};

export default CartDropdown;
