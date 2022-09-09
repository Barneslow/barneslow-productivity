import UserSessions from "./UserSessions";

import UserInfo from "./UserInfo";
import CurrentTasks from "../Tasks/CurrentTasks";
import UserTasks from "../Tasks/UserTasks";

import styles from "./UserCard.module.css";

const UserCard = () => {
  console.log("user card render");
  return (
    <div className={styles.container}>
      <UserInfo />
      <UserSessions />
      <UserTasks />
      <CurrentTasks />
    </div>
  );
};

export default UserCard;
