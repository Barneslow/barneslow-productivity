import React from "react";
import Stats from "./Stats";

const StatsChart = (props) => {
  const chartDataPoints = [
    { label: "SUN", value: 0 },
    { label: "MON", value: 0 },
    { label: "TUES", value: 0 },
    { label: "WEDS", value: 0 },
    { label: "THURS", value: 0 },
    { label: "FRI", value: 0 },
    { label: "SAT", value: 0 },
  ];

  for (const session of props.sessions) {
    const isoDate = new Date(session.date);
    const sessionDate = isoDate.getDay();

    chartDataPoints[sessionDate].value += session.time;
  }

  return <Stats dataPoints={chartDataPoints} />;
};

export default StatsChart;
