import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

import Modal from "../UI/Modal";
import UpdateUserGoals from "./UpdateUserGoals";
import SettingsModal from "../Settings/SettingsModal";

import styles from "./UserProfile.module.css";
import EditUserProfileImage from "./EditiUserProfileImage";
import UserInformation from "./UserInformation";
import GuestInformation from "../Guest/GuestInformation";
import guestImage from "../../images/guestProfile.png";

const UserProfile = ({ isLoggedInGuest }) => {
  const { user, appError, serverError, loading } = useSelector(
    (state) => state.user
  );

  const [showUpdateUserModal, setshowUpdateUserModal] = useState(false);
  const [showUpdateGoalsModal, setshowUpdateGoalsModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      popupRef.current && disableBodyScroll(popupRef.current);
    } else {
      clearAllBodyScrollLocks();
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
          <div>
            {isLoggedInGuest ? (
              <img src={guestImage} width={"100%"} />
            ) : (
              <EditUserProfileImage
                imageSrc={user?.profilePhoto}
                userName={user?.userName}
              />
            )}
            {(appError && !isLoggedInGuest) ||
            (serverError && !isLoggedInGuest) ? (
              <div className={styles["error-container"]}>
                <h3 className={styles.error}>
                  {appError} / {serverError}
                </h3>
              </div>
            ) : null}
          </div>
          {isLoggedInGuest ? (
            <GuestInformation />
          ) : (
            <UserInformation user={user} />
          )}{" "}
        </div>
        {!isLoggedInGuest && (
          <div className={styles.bio}>
            <h2 className={styles.title}>Bio</h2>
            <p>{biography}</p>
          </div>
        )}
        {!isLoggedInGuest && (
          <div className={styles.settings}>
            <button className="ui blue button" onClick={showModalHandler}>
              <i className="user icon"></i> Update Profile
            </button>
            <button className="ui green button" onClick={showGoalModalHandler}>
              <i className="chart line icon"></i> Update Goals
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfile;
