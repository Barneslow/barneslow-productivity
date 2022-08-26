import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchUserAction } from "../../store/userSlice";
import { dateFormatter } from "../../utils/dateFormater";
import { secondsToHhrsAndMins } from "../../utils/secondsToHms";

import Modal from "../UI/Modal";
import UpdateUserGoals from "./UpdateUserGoals";
import SettingsModal from "../Settings/SettingsModal";

import styles from "./UserInfo.module.css";

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

  let biography;

  if (user) {
    biography = user?.bio;
    if (biography.length > 100) biography = biography.substring(0, 100) + "...";
  }

  return (
    <>
      {showUpdateUserModal && (
        <Modal onClose={closeModal}>
          <SettingsModal onClose={closeModal} user={user} />
        </Modal>
      )}
      {showUpdateGoalsModal && (
        <Modal onClose={closeModal}>
          <UpdateUserGoals onClose={closeModal} user={user} />
        </Modal>
      )}

      <div className={styles.profile}>
        <div className={styles.container}>
          <img className={styles["user-image"]} src={user?.profilePhoto} />
          <div className={styles.information}>
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
              <span>
                {` ${secondsToHhrsAndMins(user?.weeklyGoal).hours}hrs
                  ${secondsToHhrsAndMins(user?.weeklyGoal).minutes}mins
                `}
              </span>
            </div>
            <div className={styles.box}>
              <h4>Session Goal:</h4>
              <span>
                {` ${secondsToHhrsAndMins(user?.sessionGoal).hours}hrs
                  ${secondsToHhrsAndMins(user?.sessionGoal).minutes}mins
                `}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.bio}>
          <h2 className={styles.title}>Bio</h2>
          <p>{biography}</p>
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
