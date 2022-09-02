import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSessionsAction } from "../store/sessionSlice";

import Layout from "./Layout";
import UserContainer from "../components/User/UserContainer";
import StatsContainer from "../components/Stats/StatsContainer";
import TabSwitcher from "./navigation/TabSwitcher";

import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.authentication.userAuth);

  const [viewable, setViewable] = useState("Dashboard");

  useEffect(() => {
    dispatch(fetchUserSessionsAction());
  }, [dispatch, userAuth?.id]);

  return (
    <div className={styles.dashboard}>
      <TabSwitcher view={setViewable} />

      <CSSTransition
        in={viewable === "Dashboard"}
        timeout={300}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: styles["dashboard-primary-enter"],
          enterActive: styles["dashboard-primary-enter-active"],
          exitActive: styles["dashboard-primary-exit-active"],
          exit: styles["dashboard-primary-exit"],
        }}
      >
        <Layout />
      </CSSTransition>

      <CSSTransition
        in={viewable === "Sessions"}
        timeout={300}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: styles["dashboard-primary-enter"],
          enterActive: styles["dashboard-primary-enter-active"],
          exitActive: styles["dashboard-primary-exit-active"],
          exit: styles["dashboard-primary-exit"],
        }}
      >
        <StatsContainer />
      </CSSTransition>
      <CSSTransition
        in={viewable === "User"}
        timeout={300}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: styles["dashboard-primary-enter"],
          enterActive: styles["dashboard-primary-enter-active"],
          exitActive: styles["dashboard-primary-exit-active"],
          exit: styles["dashboard-primary-exit"],
        }}
      >
        <UserContainer />
      </CSSTransition>
    </div>
  );
};

export default Dashboard;
