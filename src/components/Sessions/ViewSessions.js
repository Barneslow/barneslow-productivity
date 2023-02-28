import { secondsToMinutes } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { frequencyCounter } from "../../utils/frequencyCounter";

import { sessionsWithinSevenDays } from "../../utils/sessionTimeSinceMonday";
import { MarkerChart, RatingsChart, WeeklyChart } from "../Data/ApexCharts";

import SessionList from "./SessionList";

import styles from "./ViewSessions.module.css";

const ViewSessions = ({ status, isLoggedInGuest }) => {
  const { sessions } = useSelector((state) => state.session);
  const { user } = useSelector((state) => state.user);
  const { guestSessions } = useSelector((state) => state.guest);

  let selectedSessions;

  isLoggedInGuest
    ? (selectedSessions = guestSessions)
    : (selectedSessions = sessions);

  const sessionGoal = secondsToMinutes(user?.sessionGoal);

  const [sessionArray, setSessionArray] = useState(selectedSessions);

  const ratingArray = [];

  selectedSessions?.forEach((session) => ratingArray.push(session.rating));

  const rating = frequencyCounter(ratingArray);

  useEffect(() => {
    if (!selectedSessions || selectedSessions.length === 0) return;
    if (status === "longest") {
      let filteredTasks = [...selectedSessions].sort((sessionA, sessionB) => {
        return sessionA.time > sessionB.time ? -1 : 1;
      });

      setSessionArray(filteredTasks);
    }

    if (status === "recent") {
      let recentSessions = sessionsWithinSevenDays(selectedSessions);

      let filteredTasks = [...recentSessions].sort((sessionA, sessionB) => {
        return sessionA.createdAt > sessionB.createdAt ? -1 : 1;
      });

      console.log(recentSessions);

      setSessionArray(filteredTasks);
    }

    if (status === "rated") {
      let filteredTasks = [...selectedSessions].sort((sessionA, sessionB) => {
        return sessionA.rating > sessionB.rating ? -1 : 1;
      });

      setSessionArray(filteredTasks);
    }
  }, [status]);

  return (
    <div className={styles.container}>
      <div className={styles.chart}>
        {status === "recent" && <WeeklyChart sessions={sessionArray} />}
        {status === "rated" && <RatingsChart rating={rating} />}
        {status === "longest" &&
          !(<MarkerChart sessionGoal={sessionGoal} sessions={sessionArray} />)}
      </div>
      <div className={styles.events}>
        <h2 className={styles.title}>Sessions</h2>
        <div className={styles.container}></div>
        <SessionList
          state={"preview"}
          sessionArray={isLoggedInGuest ? guestSessions : sessionArray}
        />
      </div>
    </div>
  );
};

export default ViewSessions;
