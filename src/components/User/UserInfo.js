import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchUserAction } from "../../store/userSlice";
import Modal from "../UI/Modal";
import AccountSettings from "./AccountSettings";
import userImage from "../../images/patrick.png";
import UpdateUserProfile from "./UpdateUserProfile";

import styles from "./UserInfo.module.css";
import UpdateUserGoals from "./UpdateUserGoals";
import { dateFormatter } from "../../utils/dateFormater";

const UserInfo = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { userAuth } = useSelector((state) => state.authentication);

  useEffect(() => {
    dispatch(fetchUserAction(userAuth?.id));
  }, [dispatch, userAuth?.id]);

  const [showUpdateUserModal, setshowUpdateUserModal] = useState(false);
  const [showUpdateGoalsModal, setshowUpdateGoalsModal] = useState(false);

  const showModalHandler = (e) => {
    setshowUpdateUserModal(true);
  };

  const closeModal = (e) => {
    setshowUpdateUserModal(false);
    setshowUpdateGoalsModal(false);
  };

  const showGoalModalHandler = (e) => {
    setshowUpdateGoalsModal(true);
  };

  let bio =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam sunt placeat facilis optio eligendi nulla, ea vel ratione ullam nobis suscipit quo, sed libero! Esse tempore facere fuga consequatur cumque.";

  if (bio.length > 100) bio = bio.substring(0, 100) + "...";

  return (
    <>
      {showUpdateUserModal && (
        <Modal onClose={closeModal}>
          <AccountSettings />
          <h2 className="ui header">
            <img src={userImage} className="ui circular image" />
            Barneslow
          </h2>
          <UpdateUserProfile onClose={closeModal} user={user} />
        </Modal>
      )}
      {showUpdateGoalsModal && (
        <Modal onClose={closeModal}>
          <UpdateUserGoals onClose={closeModal} />
        </Modal>
      )}

      <div className={styles.profile}>
        <div className={styles.information}>
          <div className={styles["image-box"]}>
            <img className={styles.image} src={userImage} />
          </div>
          <div>
            <h2 className={styles.title}>{user?.userName}</h2>
            <div className={styles.box}>
              <h4>Name:</h4>
              <span>
                {user?.firstName} {user?.lastName}
              </span>
            </div>
            <div className={styles.box}>
              <h4>Email:</h4>
              <span>{user?.email}</span>
            </div>
            <div className={styles.box}>
              <h4>Date Joined:</h4>
              <span>{dateFormatter(user?.createdAt)}</span>
            </div>
            <div className={styles.box}>
              <h4>Weekly Goal:</h4>
              <span>2 days ago</span>
            </div>
          </div>
        </div>
        <div className={styles.bio}>
          <h2 className={styles.title}>Bio</h2>
          <p>{bio}</p>
        </div>
        <div className={styles.settings}>
          <button className="ui blue button" onClick={showModalHandler}>
            <i className="user icon"></i> Update Profile
          </button>
          <button className="ui green button" onClick={showGoalModalHandler}>
            <i className="chart line icon"></i> Update Goals
          </button>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
