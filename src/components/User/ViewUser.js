import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { fetchViewUserAction } from "../../store/userSlice";
import { secondsToHms } from "../../utils/secondsToHms";

import TabCard from "../UI/TabCard";

import styles from "./ViewUser.module.css";
import TimerIcon from "@mui/icons-material/Timer";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import StarsIcon from "@mui/icons-material/Stars";

const ViewUser = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { id } = useParams();
  const { viewedUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchViewUserAction(id));
  }, [id]);

  const time = secondsToHms(viewedUser?.totalSessionTime);
  return (
    <div className={styles.container}>
      <div className={styles["user-container"]}>
        <TabCard className={styles["user-tab"]}>
          <div>
            <h4>UserName</h4>
            <h2 className={styles.title}>{viewedUser?.userName}</h2>
            <p>{viewedUser?.bio}</p>
            <div className={styles.flag}>
              {location.state && (
                <img
                  className={styles["user-flag"]}
                  src={location.state.source}
                  alt={viewedUser?.country}
                  title={viewedUser?.country}
                />
              )}
            </div>
          </div>

          <div className={styles["icon-box"]}>
            <img
              className={styles["user-image"]}
              src={viewedUser?.profilePhoto}
            />
          </div>
        </TabCard>
      </div>
      <div className={styles.grid}>
        <TabCard>
          <div>
            <h4 className={styles.title}>Sessions</h4>
            <h2 className={styles.value}>{viewedUser?.sessions}</h2>
            <h4 className={styles.subtitle}>Total Session Time</h4>
            <h3>
              {time.hours}:{time.minutes}:{time.seconds}
            </h3>
          </div>

          <div
            className={styles["icon-box"]}
            style={{ background: "var(--red-gradient)" }}
          >
            <TimerIcon
              className={styles.icon}
              sx={{ fontSize: { sm: 30, md: 70 } }}
            />
          </div>
        </TabCard>
        <TabCard>
          <div>
            <h4 className={styles.title}>Completed Tasks</h4>
            <h2 className={styles.value}>{viewedUser?.tasks}</h2>
          </div>

          <div
            className={styles["icon-box"]}
            style={{ background: "var(--green-gradient)" }}
          >
            <TaskAltIcon
              className={styles.icon}
              sx={{ fontSize: { sm: 30, md: 70 } }}
            />
          </div>
        </TabCard>
        <TabCard>
          <div>
            <h4 className={styles.title}>Leaderboard</h4>
            {location.state && (
              <h2 className={styles.value}>{location.state.placement}</h2>
            )}
          </div>

          <div
            className={styles["icon-box"]}
            style={{ background: "var(--orange-gradient)" }}
          >
            <LeaderboardIcon
              className={styles.icon}
              sx={{ fontSize: { sm: 30, md: 70 } }}
            />
          </div>
        </TabCard>
        <TabCard>
          <div>
            <h4 className={styles.title}>Stars</h4>
            <h3 className={styles.value}>{viewedUser?.totalStars}</h3>
          </div>
          <div
            className={styles["icon-box"]}
            style={{ background: "var(--blue-gradient)" }}
          >
            <StarsIcon
              className={styles.icon}
              sx={{ fontSize: { sm: 30, md: 70 } }}
            />
          </div>
        </TabCard>
      </div>
    </div>
  );
};

export default ViewUser;
