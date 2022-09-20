import countryData from "../../config/sourceCountries.json";

import { dateFormatter } from "../../utils/dateFormater";
import { secondsToHhrsAndMins } from "../../utils/secondsToHms";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import StyledBlock from "../UI/StyledBlock";
import styles from "./UserInformation.module.css";

const UserInformation = ({ user }) => {
  const [countryCode] = countryData.filter(
    (country) => country.name === user.country
  );

  let source = `${countryCode.code.toLowerCase()}`;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{user?.userName}</h2>
        {user.isAccountVerified && (
          <VerifiedUserIcon sx={{ fontSize: 40, color: "var(--light-blue)" }} />
        )}
      </div>

      <div className={styles.information}>
        <StyledBlock
          title={"Name:"}
          value={`${user?.firstName} ${user?.lastName}`}
          icon={<i className="user icon blue"></i>}
        />
        <StyledBlock
          title={"Email:"}
          value={user?.email}
          icon={<i className="envelope icon red outline"></i>}
        />
        <StyledBlock
          title={"Country:"}
          value={user?.country}
          icon={
            <img
              className={styles.flag}
              src={`https://flagcdn.com/w40/${source}.png`}
              srcSet={`https://flagcdn.com/w80/${source}.png 2x`}
              width="40"
              alt={user?.country}
            />
          }
        />
        <StyledBlock
          title={"Date Joined:"}
          value={`${dateFormatter(user?.createdAt)}`}
          icon={<i className="calendar check icon orange"></i>}
        />
        <StyledBlock
          title={"Weekly Goal:"}
          value={` ${secondsToHhrsAndMins(user?.weeklyGoal).hours}hrs
        ${secondsToHhrsAndMins(user?.weeklyGoal).minutes}mins
      `}
          icon={<i className="clock icon green"></i>}
        />

        <StyledBlock
          title={"Session Goal:"}
          value={` ${secondsToHhrsAndMins(user?.sessionGoal).hours}hrs
        ${secondsToHhrsAndMins(user?.sessionGoal).minutes}mins
      `}
          icon={<i className="hourglass half icon purple"></i>}
        />
      </div>
    </div>
  );
};

export default UserInformation;
