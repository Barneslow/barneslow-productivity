import styles from "./Leader.module.css";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { secondsToHms } from "../../utils/secondsToHms";
import { Typography } from "@mui/material";

const Leader = (props) => {
  const { user, placement } = props;

  let totalTime = secondsToHms(user?.weeklySessionTime);

  const medalColor =
    placement === 1 ? "gold" : placement === 2 ? "silver" : "#CD7F32";

  let source;

  if (!user?.country) {
    source =
      "https://res.cloudinary.com/barneslow/image/upload/v1660661933/BarneslowProductivity/Flag.svg_n6ucee.png";
  } else {
    source = `https:/flagcdn.com/${user?.country.toLowerCase()}.svg`;
  }

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
        <img className={styles.flag} src={source} />
      </div>
      <div className={styles.box}>
        {placement <= 3 ? (
          <MilitaryTechIcon
            sx={{
              fontSize: 50,
              color: medalColor,
              stroke: "black",
              strokeWidth: 1,
            }}
          />
        ) : (
          <div className={styles.root}>
            <CheckBoxOutlineBlankIcon
              sx={{
                fontSize: 50,
                color: "blue",
                stroke: "black",
                strokeWidth: 1,
                opacity: "0.8",
              }}
            />
            <Typography className={styles.count}>{placement}</Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leader;
