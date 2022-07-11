import UserSessions from "./UserSessions";

import Card from "../UI/Card";
import UserInfo from "./UserInfo";
import CurrentTasks from "./CurrentTasks";
import UserTasks from "./UserTasks";

const UserCard = (props) => {
  return (
    <Card>
      <UserInfo />
      <UserSessions />
      <UserTasks />
      <CurrentTasks />
    </Card>
  );
};

export default UserCard;
