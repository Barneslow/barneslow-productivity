import { secondsToHhrsAndMins } from "../../utils/secondsToHms";
import StyledBlock from "../UI/StyledBlock";
import styles from "../User/UserInformation.module.css";
import flag from "../../images/unknownFlag.png";

const GuestInformation = ({ user }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Guest Account</h2>
      </div>

      <div className={styles.information}>
        <StyledBlock
          title={"Name:"}
          value={"Guest account"}
          icon={<i className="user icon blue"></i>}
        />
        <StyledBlock
          title={"Email:"}
          value={"Guest account"}
          icon={<i className="envelope icon red outline"></i>}
        />
        <StyledBlock
          title={"Country:"}
          value={"Guest account"}
          icon={
            <img
              className={styles.flag}
              src={flag}
              width="40"
              alt={user?.country}
            />
          }
        />
        <StyledBlock
          title={"Date Joined:"}
          value={"Guest account"}
          icon={<i className="calendar check icon orange"></i>}
        />
        <StyledBlock
          title={"Weekly Goal:"}
          value={"Guest account"}
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

export default GuestInformation;
