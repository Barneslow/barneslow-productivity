import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTasksAction } from "../../store/taskSlice";
import Table from "../UI/Table";
import TableRow from "../UI/TableRow";

const UserTasks = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(fetchUserTasksAction());
  }, [dispatch]);

  const pending = tasks?.filter((task) => task.status === "pending");
  const completed = tasks?.filter((task) => task.status === "completed");

  const data = {
    description: tasks?.length,
    status: {
      state: "pending",
      amount: pending?.length,
    },
    date: { icon: "tick", amount: completed?.length },
  };

  return (
    <Table
      field1="Total Tasks"
      field2="Pending Tasks"
      field3="Completed Tasks"
      header="Tasks"
    >
      <TableRow data={data} />
    </Table>
  );
};

export default UserTasks;
