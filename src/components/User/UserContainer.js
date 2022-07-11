import UserCard from "./UserCard";
import styles from "../../App.module.css";

const UserContainer = () => {
  return (
    <div className={styles.container}>
      <UserCard />
    </div>
  );
};

export default UserContainer;
