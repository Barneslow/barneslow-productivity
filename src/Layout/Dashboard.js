import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSessionsAction } from "../store/sessionSlice";

import Layout from "./Layout";
import UserCard from "../components/User/UserCard";
import StatsContainer from "../components/Stats/StatsContainer";
import TabSwitcher from "./navigation/TabSwitcher";

import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.authentication.userAuth);

  const [viewable, setViewable] = useState("Dashboard");
  const [value, setValue] = useState(0);

  useEffect(() => {
    dispatch(fetchUserSessionsAction());
  }, [dispatch, userAuth?.id]);

  return (
    <div className={styles.dashboard}>
      <TabSwitcher
        setViewable={setViewable}
        setValue={setValue}
        value={value}
      />

      <CSSTransition
        in={viewable === "Dashboard"}
        timeout={500}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: styles["dashboard-primary-enter"],
          enterActive: styles["dashboard-primary-enter-active"],
          exitActive: styles["dashboard-primary-exit-active"],
          exit: styles["dashboard-primary-exit"],
        }}
      >
        <Layout setState={setViewable} setValue={setValue} />
      </CSSTransition>

      <CSSTransition
        in={viewable === "Sessions"}
        timeout={500}
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
        timeout={500}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: styles["dashboard-primary-enter"],
          enterActive: styles["dashboard-primary-enter-active"],
          exitActive: styles["dashboard-primary-exit-active"],
          exit: styles["dashboard-primary-exit"],
        }}
      >
        <UserCard setState={setViewable} setValue={setValue} />
      </CSSTransition>
    </div>
  );
};

export default Dashboard;
