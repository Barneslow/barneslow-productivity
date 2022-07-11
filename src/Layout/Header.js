import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>I am the header</h1>
      <button className="ui button">Click me</button>
    </header>
  );
};

export default Header;
