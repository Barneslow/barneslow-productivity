export const sessionTimeSinceMonday = (sessions) => {
  let prevMonday = new Date();
  prevMonday.setHours(0, 0, 0, 0);
  prevMonday.setDate(prevMonday.getDate() - ((prevMonday.getDay() + 6) % 7));

  if (!sessions || sessions.length <= 0) return;

  const filteredSessions = sessions.filter(
    (session) => new Date(session.createdAt) >= prevMonday
  );

  const timeArr = [];
  let totalTime = 0;

  filteredSessions.map((session) => timeArr.push(session.time));

  if (timeArr.length > 0) totalTime = timeArr.reduce((acc, cur) => acc + cur);

  return totalTime;
};

export const sessionsWithinSevenDays = (sessions) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setHours(0, 0, 0, 0);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  if (!sessions || sessions.length <= 0) return;

  const filteredSessions = sessions.filter(
    (session) => new Date(session.createdAt) >= sevenDaysAgo
  );

  return filteredSessions;
};
