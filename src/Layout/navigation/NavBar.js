import { useDispatch, useSelector } from "react-redux";
import UserNavBar from "./UserNavBar";
import PublicNavBar from "./PublicNavBar";
import { useEffect } from "react";
import { fetchUserAction } from "../../store/userSlice";
import AccountVerificationAlert from "../../components/Auth/VerificationAlert";
import AccountVerificationSuccess from "../../components/Auth/AccountVerificationSuccess";

import styles from "./NavBar.module.css";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const NavBar = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state?.user);

  const { isAccountVerified } = user;

  const { userAuth, tokenSent, appError, serverError, loading } = auth;

  useEffect(() => {
    dispatch(fetchUserAction(userAuth?.id));
  }, [dispatch, userAuth?.id]);

  return (
    <>
      {userAuth ? (
        <UserNavBar userAuth={userAuth} user={user} />
      ) : (
        <PublicNavBar />
      )}
      {!isAccountVerified && <AccountVerificationAlert />}
      {tokenSent && <AccountVerificationSuccess />}
      {loading && (
        <div className={styles.container}>
          <LoadingSpinner />
          <h2 className={styles.loading}>Loading Please Wait</h2>
        </div>
      )}
      {appError ||
        (serverError && (
          <div className={styles.container}>
            <h2 className={styles.error}>
              {appError} {serverError}
            </h2>
          </div>
        ))}
    </>
  );
};

export default NavBar;
