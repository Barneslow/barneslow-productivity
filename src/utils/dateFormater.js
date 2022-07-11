export const dateFormatter = (dataStr) => {
  if (!dataStr) return;

  const value = new Date(dataStr).toDateString().split(" ");

  const day = value[2];
  const month = value[1];
  const year = value[3];

  return `${month} ${day}th ${year}`;
};
