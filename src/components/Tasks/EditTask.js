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
        <div className={styles["inner-container"]}>
          <label for="title" className={styles.label}>
            Title
          </label>
          <div className={styles.block}>
            <div className={styles.nav}></div>
            <input
              name="title"
              className={styles.input}
              type="text"
              placeholder={title}
              value={formik.values.title}
              onChange={formik.handleChange("title")}
              onBlur={formik.handleBlur("title")}
            />
            <div className={styles.nav}>
              {!formik.errors.title && (
                <ArrowRight onClick={handleClickRight} />
              )}
            </div>
          </div>
          <div className={styles.error}>{formik.errors.title}</div>
        </div>
      </CSSTransition>

      <CSSTransition
        in={viewable === "description"}
        timeout={300}
        mountOnEnter
        unmountOnExit
        classNames={classNames}
      >
        <div className={styles["inner-container"]}>
          <label for="description" className={styles.label}>
            Description
          </label>
          <div className={styles.block}>
            <div className={styles.nav}>
              <ArrowLeft onClick={handleClickLeft} />
            </div>
            <textarea
              name="description"
              className={styles.input}
              type="text"
              placeholder={description}
              value={formik.values.description}
              onChange={formik.handleChange("description")}
              onBlur={formik.handleBlur("description")}
            />
            <div className={styles.nav}>
              {!formik.errors.description && (
                <ArrowRight onClick={handleClickRight} />
              )}
            </div>
          </div>
          <div className={styles.error}>{formik.errors.description}</div>
        </div>
      </CSSTransition>

      <CSSTransition
        in={viewable === "time"}
        timeout={300}
        mountOnEnter
        unmountOnExit
        classNames={classNames}
      >
        <div className={styles["inner-container"]}>
          <label for="date" className={styles.label}>
            Due Date
          </label>
          <div className={styles.block}>
            <div className={styles.nav}>
              <ArrowLeft onClick={handleClickLeft} />
            </div>
            <div className={styles.input}>
              <BasicDateTimePicker
                name="date"
                placeholder={dueDate}
                sendData={(date) => setDueTime(date)}
                value={formik.values.dueDate}
                onChange={formik.handleChange("dueDate")}
                onBlur={formik.handleBlur("dueDate")}
              />
            </div>

            <div className={styles.nav}>
              {!formik.errors.description && <Save />}
            </div>
          </div>
          <div className={styles.error}>{formik.errors.dueDate}</div>
        </div>
      </CSSTransition>
      <div onClick={cancelEditHandler} className={styles.cancel}>
        &#10006;
      </div>
    </form>
  );
};

export default EditTask;
