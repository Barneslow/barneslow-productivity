export const averageSessionTimeCalc = (sessions) => {
  let totalSessions = sessions?.length;
  let time = sessions?.map((session) => session.time);
  let totalSeconds = time?.reduce((acc, cur) => acc + cur);
  let averageSeconds = Math.round(totalSeconds / totalSessions);

  return averageSeconds;
};

export const averageTimePercentDifference = (averageTime, time) => {
  let percent;

  if (time < averageTime) percent = 100 - (time / averageTime) * 100;
  if (time > averageTime) percent = ((time - averageTime) / averageTime) * 100;

  return percent.toFixed(2);
};
