import { useState } from "react";

import StarIcon from "@mui/icons-material/Star";
import styles from "./EmojiCard.module.css";
import { emojiActions } from "../../store/emojiSlice";
import { useDispatch, useSelector } from "react-redux";

const EmojiCard = ({ emoji }) => {
  const dispatch = useDispatch();
  const { name, source, price } = emoji;

  const cartItems = useSelector((state) => state.emoji.cartItems);

  const inCart = cartItems.filter((item) => {
    return item.name === emoji.name;
  });

  const purchase = inCart.length !== 0;

  const purchaseHandler = () => {
    if (purchase) {
      dispatch(emojiActions.clearItemFromCart(emoji));
    } else {
      dispatch(emojiActions.addItemToCart(emoji));
    }
  };

  const stars = 100 * price;
  let background = "var(--off-white)";

  if (purchase) {
    background = "var(--orange)";
  }

  return (
    <div
      style={{ background }}
      className={styles["card-container"]}
      onClick={purchaseHandler}
    >
      <div className={styles["image-container"]}>
        <img alt={`emoji ${name}`} src={source} />
      </div>
      <h2 className={styles.name}>{name}</h2>
      <div className={styles["price-container"]}>
        <h2 className={styles.price}>€ {price}</h2>
        <h2 className={styles.price}>
          <StarIcon sx={{ color: "yellow", stroke: "black" }} /> {stars}
        </h2>
      </div>
    </div>
  );
};

export default EmojiCard;
