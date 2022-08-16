import { useContext } from "react";
import TimerContext from "../../contexts/timerContext";

const TimerButtons = (props) => {
  const timerCtx = useContext(TimerContext);

  return (
    <div>
      <button className="ui negative button" onClick={props.handleReset}>
        Reset
      </button>

      {!timerCtx.isPaused && (
        <button
          className="ui negative basic button"
          onClick={props.handlePause}
        >
          Stop
        </button>
      )}
      {timerCtx.isPaused && (
        <button className="ui positive  button" onClick={props.handleStart}>
          Start
        </button>
      )}
    </div>
  );
};

export default TimerButtons;
