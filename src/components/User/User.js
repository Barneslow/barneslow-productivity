import { useSelector } from "react-redux";

import UserProfile from "./UserProfile";
import CurrentTasks from "../Tasks/CurrentTasks";
import UserTasks from "../Tasks/UserTasks";

import styles from "./User.module.css";
import UserSessions from "../Sessions/UserSessions";

const User = ({ setState, setValue }) => {
  const { isLoggedInGuest } = useSelector((state) => state.auth);

  return (
    <div className={styles.container}>
      <UserProfile isLoggedInGuest={isLoggedInGuest} />
      <UserSessions
        setState={setState}
        setValue={setValue}
        isLoggedInGuest={isLoggedInGuest}
      />
      <UserTasks isLoggedInGuest={isLoggedInGuest} />
      <CurrentTasks />
    </div>
  );
};

export default User;
