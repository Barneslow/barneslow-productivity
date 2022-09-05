import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { dateFormatter } from "../../utils/dateFormater";
import { secondsToHhrsAndMins } from "../../utils/secondsToHms";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

import Modal from "../UI/Modal";
import UpdateUserGoals from "./UpdateUserGoals";
import SettingsModal from "../Settings/SettingsModal";

import styles from "./UserInfo.module.css";

const UserInfo = (props) => {
  const { user } = useSelector((state) => state.user);
  const [showUpdateUserModal, setshowUpdateUserModal] = useState(false);
  const [showUpdateGoalsModal, setshowUpdateGoalsModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      console.log("fire");
      console.log(popupRef.current);
      popupRef.current && disableBodyScroll(popupRef.current);
    } else {
      popupRef.current && enableBodyScroll(popupRef.current);
    }
  }, [isOpen]);

  const showModalHandler = (e) => {
    setshowUpdateUserModal(true);
    setIsOpen(true);
  };

  const closeModal = (e) => {
    setshowUpdateUserModal(false);
    setshowUpdateGoalsModal(false);
    setIsOpen(false);
  };

  const showGoalModalHandler = (e) => {
    setshowUpdateGoalsModal(true);
    setIsOpen(true);
  };

  let biography;

  if (user) {
    biography = user?.bio;
    if (biography.length > 100) biography = biography.substring(0, 100) + "...";
  }

  return (
    <>
      {showUpdateUserModal && (
        <Modal onClose={closeModal} ref={popupRef}>
          <SettingsModal onClose={closeModal} user={user} />
        </Modal>
      )}
      {showUpdateGoalsModal && (
        <Modal onClose={closeModal} ref={popupRef}>
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
