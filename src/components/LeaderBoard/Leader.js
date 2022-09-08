import styles from "./Leader.module.css";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { secondsToHms } from "../../utils/secondsToHms";
import { Typography } from "@mui/material";
import countryData from "../../config/sourceCountries.json";
import { useNavigate } from "react-router-dom";

const Leader = (props) => {
  const navigate = useNavigate();
  const { user, placement } = props;

  let totalTime = secondsToHms(user?.weeklySessionTime);

  const medalColor =
    placement === 1 ? "gold" : placement === 2 ? "silver" : "#CD7F32";

  const [countryCode] = countryData.filter(
    (country) => country.name === user.country
  );

  let source;

  if (!user?.country) {
    source =
      "https://res.cloudinary.com/barneslow/image/upload/v1660661933/BarneslowProductivity/Flag.svg_n6ucee.png";
  } else {
    source = `${countryCode.code.toLowerCase()}`;
  }

  const navigateHandler = () => {
    navigate(`/user/${user?._id}`, { state: { placement, source } });
  };

  console.log(source);

  return (
    <div onClick={navigateHandler} className={styles.container}>
      <div className={styles.box}>
        <h3>{user.userName}</h3>
      </div>
      <div className={styles.box}>
        <h3>
          {totalTime.hours}:{totalTime.minutes}
        </h3>

        <img
          src="https://flagcdn.com/w40/za.png"
          srcset="https://flagcdn.com/w80/za.png 2x"
          width="40"
          alt="South Africa"
        ></img>
      </div>
      <div className={styles.box}>
        <img
          className={styles.flag}
          src={`https://flagcdn.com/w40/${source}.png`}
          srcset={`https://flagcdn.com/w80/${source}.png 2x`}
          width="40"
          alt={user?.country}
        ></img>
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
