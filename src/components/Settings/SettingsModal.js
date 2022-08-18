import { useSelector } from "react-redux";
import AccountSettingsTitle from "../User/AccountSettingsTitle";
import EditUserProfileImage from "../User/EditiUserProfileImage";
import UpdateUserProfile from "../User/UpdateUserProfile";

const SettingsModal = (props) => {
  const { user } = useSelector((state) => state.user);

  return (
    <div>
      <AccountSettingsTitle />
      <EditUserProfileImage
        imageSrc={user?.profilePhoto}
        userName={user?.userName}
      />
      <UpdateUserProfile onClose={props.onClose} user={user} />
    </div>
  );
};

export default SettingsModal;
