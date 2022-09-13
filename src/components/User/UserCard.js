import UserInfo from "./UserInfo";
import CurrentTasks from "../Tasks/CurrentTasks";
import UserTasks from "../Tasks/UserTasks";

import styles from "./UserCard.module.css";
import UserSessions from "../Sessions/UserSessions";

const UserCard = ({ setState, setValue }) => {
  console.log("user card render");
  return (
    <div className={styles.container}>
      <UserInfo />
      <UserSessions setState={setState} setValue={setValue} />
      <UserTasks />
      <CurrentTasks />
    </div>
  );
};

export default UserCard;
