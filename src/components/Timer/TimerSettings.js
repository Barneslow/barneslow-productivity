import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../UI/Card";
import { PrettoSlider, WorkingSlider } from "./StyledSlider";
import { selectTimer, timerActions } from "../../store/timerSlice";

import styles from "./TimerSettings.module.css";

const TimerSettings = () => {
  const dispatch = useDispatch();
  const timerState = useSelector(selectTimer);
  const [showSettings, setShowSettings] = useState(false);
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);

  const handleWorkChange = (e, newValue) => {
    setWorkTime(newValue);
  };

  const handleBreakChange = (e, newValue) => {
    setBreakTime(newValue);
  };

  const saveSessionSettings = () => {
    setShowSettings(!showSettings);

    dispatch(timerActions.updateTimerClock({ workTime, breakTime }));
  };

  return (
    <Card>
      {showSettings && (
        <div className={styles.container}>
          <h3>Work Time: {workTime}</h3>
          <WorkingSlider
            step={5}
            defaultValue={25}
            min={5}
            max={120}
            value={workTime}
            onChange={handleWorkChange}
          />
          <h3>Break Time: {breakTime} </h3>
          <PrettoSlider
            step={5}
            defaultValue={25}
            min={5}
            max={30}
            value={breakTime}
            onChange={handleBreakChange}
          />

          <div className="ui buttons">
            <button
              className="ui red button"
              onClick={() => setShowSettings(!showSettings)}
            >
              Cancel
            </button>
            <div className="or"></div>
            <button
              className="ui positive button"
              onClick={saveSessionSettings}
            >
              Save Settings
            </button>
          </div>
        </div>
      )}
      {!showSettings && (
        <>
          <button
            className="ui blue button"
            onClick={() => setShowSettings(!showSettings)}
          >
            <i className="cogs icon"></i>
            Settings
          </button>
        </>
      )}
    </Card>
  );
};

export default TimerSettings;
