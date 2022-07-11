import { useContext, useEffect, useState } from "react";
import TimerContext from "../../contexts/timerContext";

let init = true;

const TimerButtons = (props) => {
  const timerCtx = useContext(TimerContext);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    if (init) {
      init = false;
      return;
    }
    setIsPaused((prevState) => !prevState);
  }, [timerCtx.isPaused]);

  return (
    <div>
      <button className="ui negative button" onClick={props.handleReset}>
        Reset
      </button>

      {!isPaused && (
        <button
          className="ui negative basic button"
          onClick={props.handlePause}
        >
          Stop
        </button>
      )}
      {isPaused && (
        <button className="ui positive  button" onClick={props.handleStart}>
          Start
        </button>
      )}
    </div>
  );
};

export default TimerButtons;
