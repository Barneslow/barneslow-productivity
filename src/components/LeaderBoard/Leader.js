import styles from "./Leader.module.css";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { secondsToHms } from "../../utils/secondsToHms";

const Leader = (props) => {
  const { user, placement } = props;

  let totalTime = secondsToHms(user?.weeklySessionTime);

  const medalColor =
    placement === 1
      ? "gold"
      : placement === 2
      ? "silver"
      : placement === 3
      ? "bronze"
      : "black";

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h3>{user.userName}</h3>
      </div>
      <div className={styles.box}>
        <h3>
          {totalTime.hours}:{totalTime.minutes}
        </h3>
      </div>
      <div className={styles.box}>
        <img
          className={styles.flag}
          src={`https:/flagcdn.com/${user?.country.toLowerCase()}.svg`}
        />
      </div>
      <div className={styles.box}>
        <MilitaryTechIcon
          sx={{
            fontSize: 50,
            color: medalColor,
            stroke: "black",
            strokeWidth: 1,
          }}
        />
      </div>
    </div>
  );
};

export default Leader;
