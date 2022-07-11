import styles from "./Notes.module.css";

const Notes = (props) => {
  const { openNotes, setOpenNotes } = props;

  const toggleNotes = () => {
    setOpenNotes(true);
  };

  function NavItem(props) {
    return (
      <a className={styles["nav-item"]} onClick={toggleNotes}>
        View Notes
        <i className="edit icon"></i>
      </a>
    );
  }

  return (
    <nav className={styles.notes}>
      <div className={styles["navbar-nav"]}>
        <NavItem />
      </div>
    </nav>
  );
};

export default Notes;
