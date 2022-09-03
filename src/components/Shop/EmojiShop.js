import { useState, useEffect } from "react";

import EmojiList from "./EmojiList";
import SearchBox from "../User/SearchBox";

import styles from "./EmojiShop.module.css";
import { useSelector } from "react-redux";

const EmojiShop = () => {
  const [searchField, setSearchField] = useState("");
  const [emojis, setEmoji] = useState([]);
  const [filteredEmoji, setFilterEmoji] = useState(emojis);
  const emojisData = useSelector((state) => state.emoji.emojisData);

  useEffect(() => {
    if (emojisData) {
      setEmoji(emojisData);

      const newFilteredEmojis = emojis.filter((emoji) => {
        return emoji.name.toLocaleLowerCase().includes(searchField);
      });

      setFilterEmoji(newFilteredEmojis);
    }
  }, [emojis, searchField, emojisData]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className={styles.store}>
      <h2 className={styles.title}>Emoji Shop</h2>
      <SearchBox onChangeHandler={onSearchChange} placeholder="Search emoji" />
      <EmojiList emojis={filteredEmoji} />
    </div>
  );
};

export default EmojiShop;
