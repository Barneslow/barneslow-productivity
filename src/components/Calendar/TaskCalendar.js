import React, { useState } from "react";
import Calendar from "react-calendar";

import moment from "moment";

import "./reactCalendar.css";

import styles from "./TaskCalendar.module.css";
import { useSelector } from "react-redux";
import TaskList from "../Tasks/TaskList";
import { useEffect } from "react";

const TaskCalander = ({ status, setStatus }) => {
  const { tasks } = useSelector((state) => state.task);
  const { isLoggedInGuest } = useSelector((state) => state.auth);
  const { guestTasks } = useSelector((state) => state.guest);

  const [events, setEvents] = useState([]);

  let dateArr = [];

  isLoggedInGuest
    ? guestTasks?.map((task) =>
        dateArr.push(moment(task.dueDate).format("DD-MM-YYYY"))
      )
    : tasks?.map((task) =>
        dateArr.push(moment(task.dueDate).format("DD-MM-YYYY"))
      );

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    let selectedTasks;

    isLoggedInGuest ? (selectedTasks = guestTasks) : (selectedTasks = tasks);

    if (status) {
      let filteredTasks = [];

      if (status === "total") {
        filteredTasks = selectedTasks;
      } else {
        filteredTasks = selectedTasks?.filter((task) => {
          return task.status === status;
        });
      }

      setEvents(filteredTasks);
    }
  }, [status, tasks, guestTasks]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const onChange = (newDate) => {
    let selectedTasks;

    isLoggedInGuest ? (selectedTasks = guestTasks) : (selectedTasks = tasks);

    const filteredEvents = selectedTasks.filter((task) => {
      return (
        moment(newDate).format("DD-MM-YYYY") ===
        moment(task.dueDate).format("DD-MM-YYYY")
      );
    });

    setStatus(undefined);
    setEvents(filteredEvents);
    setDate(newDate);
  };

  return (
    <div className={styles.container}>
      <Calendar
        onChange={onChange}
        value={date}
        tileClassName={({ date, view }) => {
          if (dateArr.find((x) => x === moment(date).format("DD-MM-YYYY"))) {
            return `${styles.highlight}`;
          }
        }}
      />
      <div className={styles.events}>
        <h2 className={styles.title}>Tasks</h2>
        <p className={styles.date}>
          {status
            ? `${capitalizeFirstLetter(status)} Tasks`
            : `${date.toDateString().split(" ").slice(1).join(" ")}`}
        </p>
        <TaskList state={"preview"} tasksArray={events} />
      </div>
    </div>
  );
};

export default TaskCalander;
