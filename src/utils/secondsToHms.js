export const secondsToHms = (totalSeconds) => {
  totalSeconds = Number(totalSeconds);
  var hours = Math.floor(totalSeconds / 3600);
  var minutes = Math.floor((totalSeconds % 3600) / 60);
  var seconds = Math.floor((totalSeconds % 3600) % 60);

  return { hours, minutes, seconds };
};
