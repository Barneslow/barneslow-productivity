import { useSelector } from "react-redux";
import AccountSettingsTitle from "../User/AccountSettingsTitle";
import EditUserProfileImage from "../User/EditiUserProfileImage";
import UpdateUserProfile from "../User/UpdateUserProfile";

import styles from "./SettingsModal.module.css";

const SettingsModal = (props) => {
  const { user } = useSelector((state) => state.user);

  return (
    <div>
      <AccountSettingsTitle />
      <div className={styles.container}>
        <div className={styles["image-box"]}>
          <img className={styles["user-image"]} src={user?.profilePhoto} />
        </div>
        <h2 className={styles.username}>{user?.userName}</h2>
      </div>
      <UpdateUserProfile onClose={props.onClose} user={user} />
    </div>
  );
};

export default SettingsModal;
