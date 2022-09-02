import * as React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const TestProgressBar = () => {
  const value = 10;
  return (
    <div>
      <CircularProgressbar
        value={value}
        text="test"
        styles={buildStyles({
          textColor: "#fff",
          pathColor: "green",
          tailColor: "rgba(255,255,255,.2)",
        })}
      />
    </div>
  );
};

export default TestProgressBar;
