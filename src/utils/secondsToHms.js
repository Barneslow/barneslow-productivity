export const secondsToHms = (totalSeconds) => {
  totalSeconds = Number(totalSeconds);
  const hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = Math.floor((totalSeconds % 3600) % 60);

  if (seconds < 10) seconds = "0" + seconds;
  if (minutes < 10) minutes = "0" + minutes;

  return { hours, minutes, seconds };
};

export const secondsToHhrsAndMins = (totalSeconds) => {
  totalSeconds = Number(totalSeconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  return { hours, minutes };
};

export const secondsToMinsAndSecs = (totalSeconds) => {
  totalSeconds = Number(totalSeconds);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor((totalSeconds % 3600) % 60);

  return { minutes, seconds };
};
