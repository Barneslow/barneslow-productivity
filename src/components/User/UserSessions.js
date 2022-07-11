import { useDispatch, useSelector } from "react-redux";
import Table from "../UI/Table";
import TableRow from "../UI/TableRow";
import { secondsToHms } from "../../utils/secondsToHms";
import { useEffect } from "react";
import { fetchUserSessionsAction } from "../../store/sessionSlice";

const UserSessions = () => {
  const dispatch = useDispatch();
  const { sessions } = useSelector((state) => state.session);

  useEffect(() => {
    dispatch(fetchUserSessionsAction());
  }, [dispatch]);

  let data;

  let totalSessions = sessions?.length;
  let time = sessions?.map((session) => session.time);

  if (time?.length > 0) {
    let totalSeconds = time?.reduce((acc, cur) => acc + cur);
    let averageSeconds = Math.round(totalSeconds / totalSessions);

    totalSeconds = secondsToHms(totalSeconds);
    averageSeconds = secondsToHms(averageSeconds);

    const totalTime = `${totalSeconds.hours}:${totalSeconds.minutes}:${totalSeconds.seconds}`;
    const averageTime = `${averageSeconds.hours}:${averageSeconds.minutes}:${averageSeconds.seconds}`;

    data = {
      description: totalSessions,
      status: totalTime,
      date: { amount: averageTime },
    };
  }

  return (
    <Table
      field1="Total Sessions"
      field2="Total Time"
      field3="Average Time"
      header="Sessions"
    >
      <TableRow data={data} />
    </Table>
  );
};

export default UserSessions;
