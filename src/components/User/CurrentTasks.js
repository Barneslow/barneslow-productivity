import Table from "../UI/Table";
import TableRow from "../UI/TableRow";
import styles from "./CurrentTasks.module.css";

const CurrentTasks = () => {
  const data = [
    {
      task: "Build Blog",
      status: { state: "failed" },
      date: { amount: "10/10/2021" },
      id: "1",
    },
    {
      task: "Build Productivity",
      status: { state: "pending" },
      date: { amount: "10/10/2021" },
      id: "2",
    },
    {
      task: "Workout",
      status: { state: "completed" },
      date: { amount: "10/10/2021" },
      id: "3",
    },
  ];

  return (
    <Table
      field1="Task"
      field2="Status"
      field3="Due Date"
      header="Current Tasks"
    >
      {data.map((field) => (
        <TableRow selectable="true" data={field} key={field.id} />
      ))}
    </Table>
  );
};

export default CurrentTasks;
