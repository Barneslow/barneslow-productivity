import EmojiCard from "./EmojiCard";
import styles from "./EmojiList.module.css";

const EmojiList = ({ emojis }) => (
  <div className={styles["card-list"]}>
    {emojis.map((emoji) => {
      return <EmojiCard key={emoji.id} emoji={emoji} />;
    })}
  </div>
);

export default EmojiList;
