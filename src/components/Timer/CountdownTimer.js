import { secondsToHms } from "../../utils/secondsToHms";

import styles from "./CountdownTimer.module.css";

const CountdownTimer = (props) => {
  const { goal, session } = props;

  let timeLeft;

  if (goal < session) {
    timeLeft = secondsToHms(goal);
  } else {
    timeLeft = secondsToHms(goal - session);
  }

  return (
    <div className={styles.countdown}>
      <h3>
        {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
      </h3>
    </div>
  );
};

export default CountdownTimer;
