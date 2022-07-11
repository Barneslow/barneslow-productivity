import Table from "../UI/Table";
import TableRow from "../UI/TableRow";

const UserTasks = () => {
  const data = {
    task: "100",
    status: { state: "pending", amount: 10 },
    date: { icon: "tick", amount: 90 },
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
