import { createContext } from "react";

const TimerContext = createContext({
  isPaused: true,
});

export const TimerContextProvider = (props) => {
  const value = {
    isPaused: true,
  };

  return (
    <TimerContext.Provider value={value}>
      {props.children}
    </TimerContext.Provider>
  );
};

export default TimerContext;
