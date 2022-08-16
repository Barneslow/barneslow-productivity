import Leader from "./Leader";
import styles from "./Leaderboard.module.css";

const Leaderboard = (props) => {
  const { users } = props;

  console.log(users);

  if (!users) return;
  const dupUsers = [...users];

  const sortedUsers = dupUsers?.sort((a, b) => {
    console.log(a.weeklySessionTime);
    return a.weeklySessionTime < b.weeklySessionTime
      ? 1
      : b.weeklySessionTime < a.weeklySessionTime
      ? -1
      : 0;
  });

  return (
    <div className={styles.container}>
      <h2>Weekly Leaderboard</h2>
      {users &&
        sortedUsers.map((user, key) => (
          <Leader user={user} key={user._id} placement={key + 1} />
        ))}
    </div>
  );
};

export default Leaderboard;
