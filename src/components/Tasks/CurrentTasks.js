import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserTasksAction } from "../../store/taskSlice";

import Table from "../UI/Table";
import TableRow from "../UI/TableRow";
import { dateFormatter } from "../../utils/dateFormater";

const CurrentTasks = () => {
  const tasks = useSelector((state) => state.task.tasks);

  const nonArchivedTasks = tasks?.filter((task) => !task.isArchive);

  const dataArray = [];
  nonArchivedTasks?.map((field) =>
    dataArray.push({
      description: field.description,
      status: { state: field.status },
      date: { amount: dateFormatter(field.dueDate) },
      id: field._id,
    })
  );

  return (
    <Table
      field1="Task"
      field2="Status"
      field3="Due Date"
      header="Current Tasks"
    >
      {dataArray?.map((data) => (
        <TableRow selectable="true" data={data} key={data.id} />
      ))}
    </Table>
  );
};

export default CurrentTasks;
