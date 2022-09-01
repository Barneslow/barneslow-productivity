import { useState, useEffect } from "react";
import axios from "axios";

import EmojiList from "./EmojiList";
import SearchBox from "../User/SearchBox";

import styles from "./EmojiStore.module.css";
import { useSelector } from "react-redux";

const EmojiStore = () => {
  const [searchField, setSearchField] = useState("");
  const [emojis, setEmoji] = useState([]);
  const [filteredEmoji, setFilterEmoji] = useState(emojis);
  const { emojisData } = useSelector((state) => state.emoji);

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
      <h2 className={styles.title}>Emoji Store</h2>
      <SearchBox onChangeHandler={onSearchChange} placeholder="Search emoji" />
      <EmojiList emojis={filteredEmoji} />
    </div>
  );
};

export default EmojiStore;
