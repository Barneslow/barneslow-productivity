import { useState } from "react";
import { dateFormatter } from "../../utils/dateFormater";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CancelIcon from "@mui/icons-material/Cancel";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useDispatch } from "react-redux";
import { deleteNoteAction, editNoteAction } from "../../store/noteSlice";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import * as Yup from "yup";
import { useFormik } from "formik";

import styles from "./Note.module.css";

const formSchema = Yup.object({
  description: Yup.string().required("Description is required*"),
});

const Note = ({ note }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const formik = useFormik({
    initialValues: {
      description: note.description,
    },

    onSubmit: (values) => {
      const data = {
        description: values?.description,
        noteId: note.id,
      };

      console.log(data);

      dispatch(editNoteAction(data));

      setIsEditing(false);
    },
    validationSchema: formSchema,
  });

  const editHandler = () => {
    setIsEditing(true);
  };

  const cancelEditHandler = () => {
    setIsEditing(false);
  };

  const deleteNoteHandler = () => {
    dispatch(deleteNoteAction(note.id));
  };

  return (
    <div key={note.id} className={styles.note}>
      <h3 className={styles.date}>
        <CalendarMonthIcon sx={{ fontSize: 30, color: "var(--dark-grey)" }} />
        {dateFormatter(note.createdAt)}
      </h3>
      {!isEditing ? (
        <div className={styles.content}>
          <p className={styles.description}>{note.description}</p>
          <div className={styles["button-box"]}>
            <button onClick={editHandler} className={styles.button}>
              <EditIcon sx={{ color: "darkorange", fontSize: 30 }} />
              Edit
            </button>
            <button onClick={deleteNoteHandler} className={styles.button}>
              <DeleteForeverIcon sx={{ color: "red", fontSize: 30 }} />
              Delete
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit} className={styles.content}>
          <textarea
            value={formik.values.description}
            onChange={formik.handleChange("description")}
            onBlur={formik.handleBlur("description")}
            className={styles.description}
          ></textarea>
          <div className={styles.error}>{formik.errors.description}</div>

          <div className={styles["button-box"]}>
            <button type="submit" className={styles.button}>
              <CheckCircleIcon sx={{ color: "green", fontSize: 30 }} /> Save
            </button>
            <button onClick={cancelEditHandler} className={styles.button}>
              <CancelIcon sx={{ color: "red", fontSize: 30 }} />
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Note;
