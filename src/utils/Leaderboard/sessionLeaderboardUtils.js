const sortedTimeArray = (sessions) => {
  const sessionsTime = [];
  sessions.map((session) => sessionsTime.push(session.time));

  const dupSessionsTime = [...sessionsTime];

  const sortedTime = dupSessionsTime?.sort((a, b) => {
    if (a === Infinity) return 1;
    else if (isNaN(a)) return -1;
    else return b - a;
  });

  return sortedTime;
};

export const sessionLeaderboardCalc = (sessions, session) => {
  const sortedTime = sortedTimeArray(sessions);

  let index;

  for (let i = 0; i < sortedTime.length; i++) {
    if (session.time >= sortedTime[i]) {
      index = i + 1;
      break;
    }
  }

  return index;
};

export const topSessionPercent = (sessions, session) => {
  const sortedTime = sortedTimeArray(sessions);

  let index;
  for (let i = 0; i < sortedTime.length; i++) {
    if (session.time > sortedTime[i]) {
      index = i + 1;
      break;
    }
  }

  const percent = (index / sortedTime.length) * 100;

  return percent.toFixed();
};
