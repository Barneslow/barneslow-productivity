import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../App.module.css";
import { fetchAllUsersAction } from "../../store/userSlice";
import Leaderboard from "./Leaderboard";

const LeaderBoardContainer = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAllUsersAction());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Leaderboard users={users} />
    </div>
  );
};

export default LeaderBoardContainer;
