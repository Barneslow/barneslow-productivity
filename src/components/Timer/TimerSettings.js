import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PrettoSlider, WorkingSlider } from "./StyledSlider";
import { selectTimer, timerActions } from "../../store/timerSlice";

import SettingsIcon from "@mui/icons-material/Settings";

import styles from "./TimerSettings.module.scss";
import { IconButton } from "@mui/material";
import { borderRadius } from "@mui/system";

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
    <div className={styles.container}>
      {showSettings && (
        <div className={styles["settings-container"]}>
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
          <h2 className={styles.title}>Settings</h2>
          <IconButton
            className={styles.settings}
            sx={{
              background: "#2086d0",
            }}
            onClick={() => setShowSettings(!showSettings)}
          >
            <SettingsIcon
              className={styles.cog}
              sx={{
                color: "darkgrey",
                borderRadius: 2,
                fontSize: 100,
                stroke: "black",
                strokeWidth: 0.5,
                strokeOpacity: 0.8,
              }}
            />
          </IconButton>
        </>
      )}
    </div>
  );
};

export default TimerSettings;
