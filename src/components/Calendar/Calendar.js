import React, { useState } from "react";
import Calendar from "react-calendar";

import moment from "moment";

import "./reactCalendar.css";

import styles from "./Calendar.module.css";
import { useSelector } from "react-redux";
import TaskList from "../Tasks/TaskList";

const TaskCalander = () => {
  const { tasks } = useSelector((state) => state.task);
  const [events, setEvents] = useState([]);

  const dateArr = [];

  tasks?.map((task) => dateArr.push(moment(task.dueDate).format("DD-MM-YYYY")));

  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    const filteredEvents = tasks.filter((task) => {
      return (
        moment(date).format("DD-MM-YYYY") ===
        moment(task.dueDate).format("DD-MM-YYYY")
      );
    });

    setEvents(filteredEvents);
    setDate(date);
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
        <h2 className={styles.title}>Events</h2>
        <TaskList tasksArray={events} />
      </div>
    </div>
  );
};

export default TaskCalander;
