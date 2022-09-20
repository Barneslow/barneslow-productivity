import UserProfile from "./UserProfile";
import CurrentTasks from "../Tasks/CurrentTasks";
import UserTasks from "../Tasks/UserTasks";

import styles from "./User.module.css";
import UserSessions from "../Sessions/UserSessions";

const User = ({ setState, setValue }) => {
  console.log("user card render");
  return (
    <div className={styles.container}>
      <UserProfile />
      <UserSessions setState={setState} setValue={setValue} />
      <UserTasks />
      <CurrentTasks />
    </div>
  );
};

export default User;
