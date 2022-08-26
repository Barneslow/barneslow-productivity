import { useState } from "react";

import StarIcon from "@mui/icons-material/Star";
import styles from "./EmojiCard.module.css";

const EmojiCard = ({ emoji }) => {
  const { id, name, source, price } = emoji;

  const [purchase, setPurchase] = useState(false);

  const purchaseHandler = (e) => {
    setPurchase(!purchase);
  };

  const stars = 100 * price;
  let background = "grey";

  if (purchase) {
    background = "var(--green)";
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
