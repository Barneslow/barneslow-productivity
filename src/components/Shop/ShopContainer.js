import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllEmojisAction } from "../../store/emojiSlice";

import EmojiStore from "./EmojiShop";
import styles from "./ShopContainer.module.css";
import CartIcon from "../Cart/CartIcon";

const ShopContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllEmojisAction());
  }, []);
  return (
    <div className={styles.container}>
      <CartIcon />
      <EmojiStore />
    </div>
  );
};

export default ShopContainer;
