import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { BasicDateTimePicker } from "../UI/DatePicker";
import { updateTaskAction } from "../../store/taskSlice";

import { CSSTransition } from "react-transition-group";

import styles from "./EditTask.module.css";
import ArrowRight from "../UI/ArrowRight";
import ArrowLeft from "../UI/ArrowLeft";
import Save from "../UI/Save";

const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  // dueDate: Yup.date().required("Date is required"),
});

const EditTask = ({ task, cancelEdit }) => {
  const dispatch = useDispatch();
  const [viewable, setViewable] = useState("title");
  const [direction, setDirection] = useState("right");

  const { id, description, title, dueDate } = task;

  console.log(dueDate);

  const [dueTime, setDueTime] = useState();

  const formik = useFormik({
    initialValues: {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
    },

    onSubmit: (values) => {
      console.log(dueTime);
      const dueDate = dueTime?.$d;

      const data = {
        id,
        title: values.title,
        description: values.description,
        dueDate,
        status: task.status,
      };

      console.log(data);
      dispatch(updateTaskAction(data));
      cancelEdit();
    },

    validationSchema: formSchema,
  });

  const cancelEditHandler = () => {
    cancelEdit();
  };

  const handleClickRight = (e) => {
    setDirection("right");

    if (viewable === "title") {
      setViewable("description");
    }

    if (viewable === "description") {
      setViewable("time");
    }
  };

  const handleClickLeft = (e) => {
    setDirection("left");
    if (viewable === "time") {
      setViewable("description");
    }
    if (viewable === "description") {
      setViewable("title");
    }
  };

  const classNames =
    direction === "right"
      ? {
          enter: styles["dashboard-primary-enter"],
          enterActive: styles["dashboard-primary-enter-active"],
          exitActive: styles["dashboard-primary-exit-active"],
          exit: styles["dashboard-primary-exit"],
        }
      : {
          enter: styles["dashboard-secondary-enter"],
          enterActive: styles["dashboard-secondary-enter-active"],
          exitActive: styles["dashboard-secondary-exit-active"],
          exit: styles["dashboard-secondary-exit"],
        };

  return (
    <form className={styles.container} onSubmit={formik.handleSubmit}>
      <CSSTransition
        in={viewable === "title"}
        timeout={300}
        mountOnEnter
        unmountOnExit
        classNames={classNames}
      >
        <div className={styles.block}>
          <label className={styles.label}>Title</label>
          <input
            className={styles.input}
            type="text"
            placeholder={title}
            value={formik.values.title}
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
          ></input>{" "}
          <div className={styles.error}>{formik.errors.title}</div>
          {!formik.errors.title && <ArrowRight onClick={handleClickRight} />}
        </div>
      </CSSTransition>

      <CSSTransition
        in={viewable === "description"}
        timeout={300}
        mountOnEnter
        unmountOnExit
        classNames={classNames}
      >
        <div className={styles.block}>
          <label className={styles.label}>Description</label>
          <textarea
            type="text"
            placeholder={description}
            value={formik.values.description}
            onChange={formik.handleChange("description")}
            onBlur={formik.handleBlur("description")}
            className={styles.description}
          ></textarea>
          <div className={styles.error}>{formik.errors.description}</div>
          {!formik.errors.description && (
            <ArrowRight onClick={handleClickRight} />
          )}
          <ArrowLeft onClick={handleClickLeft} />
        </div>
      </CSSTransition>

      <CSSTransition
        in={viewable === "time"}
        timeout={300}
        mountOnEnter
        unmountOnExit
        classNames={classNames}
      >
        <div className={styles.block}>
          <label className={styles.label}>Due Date</label>
          <BasicDateTimePicker
            placeholder={dueDate}
            sendData={(date) => setDueTime(date)}
            value={formik.values.dueDate}
            onChange={formik.handleChange("dueDate")}
            onBlur={formik.handleBlur("dueDate")}
          />
          <Save />
          <ArrowLeft onClick={handleClickLeft} />
        </div>
      </CSSTransition>
    </form>
  );
};

export default EditTask;

{
  /* <div className={styles.block}>
<button type="submit" className="ui button positive">
  Save
</button>
<button onClick={cancelEditHandler} className="ui button negative">
  Cancel
</button>
</div> */
}
