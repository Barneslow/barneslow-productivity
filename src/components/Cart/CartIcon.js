import { useDispatch, useSelector } from "react-redux";
import { emojiActions } from "../../store/emojiSlice";

import { ReactComponent as ShoppingIcon } from "../../images/shopping-bag.svg";

import styles from "./CartIcon.module.css";
import CartDropdown from "./CartDropdown";

const CartIcon = () => {
  const dispatch = useDispatch();

  const { isCartOpen, cartCount } = useSelector((state) => state.emoji);

  const toggleIsCartOpen = () => dispatch(emojiActions.setIsCartOpen());

  return (
    <div className={styles.container} onClick={toggleIsCartOpen}>
      <ShoppingIcon className={styles.icon} />
      {isCartOpen && <CartDropdown />}
      <div className={styles.count}>{cartCount}</div>
    </div>
  );
};

export default CartIcon;
