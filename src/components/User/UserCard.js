import UserSessions from "./UserSessions";

import UserInfo from "./UserInfo";
import CurrentTasks from "./CurrentTasks";
import UserTasks from "./UserTasks";

import styles from "./UserCard.module.css";

const UserCard = (props) => {
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
