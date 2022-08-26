import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllEmojisAction } from "../../store/emojiSlice";

import EmojiStore from "./EmojiStore";
import styles from "./StoreContainer.module.css";
import CartIcon from "./CartIcon";

const StoreContainer = () => {
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

export default StoreContainer;
