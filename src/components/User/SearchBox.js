import styles from "./SearchBox.module.css";

const SearchBox = ({ placeholder, onChangeHandler }) => (
  <input
    className={styles["search-box"]}
    type="search"
    placeholder={placeholder}
    onChange={onChangeHandler}
  />
);

export default SearchBox;
