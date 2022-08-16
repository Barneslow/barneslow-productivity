export const sessionTimeSinceMonday = (sessions) => {
  let prevMonday = new Date();
  prevMonday.setHours(0, 0, 0, 0);
  prevMonday.setDate(prevMonday.getDate() - ((prevMonday.getDay() + 6) % 7));

  if (!sessions || sessions.length <= 0) return;

  const filteredSessions = sessions.filter(
    (session) => new Date(session.createdAt) >= prevMonday
  );

  const timeArr = [];

  filteredSessions.map((session) => timeArr.push(session.time));

  const totalTime = timeArr.reduce((acc, cur) => acc + cur);

  return totalTime;
};
