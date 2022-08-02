import { useState } from "react";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { dateFormatter } from "../../utils/dateFormater";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Checkbox, IconButton } from "@mui/material";
import styles from "./SessionsNotes.module.css";
import { useDispatch } from "react-redux";
import { deleteNoteAction } from "../../store/noteSlice";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import * as Yup from "yup";
import { useFormik } from "formik";

const formSchema = Yup.object({
  text: Yup.string().required("Text is required"),
});

const Note = ({ note }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    onSubmit: (values) => {
      console.log(values);
      setIsEditing(false);
    },
    validationSchema: formSchema,
  });

  const onChangeHandler = () => {
    console.log("fire");
    setIsEditing(true);
  };

  const deleteNoteHandler = () => {
    dispatch(deleteNoteAction(note.id));
  };

  return (
    <div key={note.id} className={styles.note}>
      <h1>{dateFormatter(note.createdAt)}</h1>
      {!isEditing ? (
        <>
          <p className={styles.description}>{note.description}</p>
          <div>
            <Checkbox
              icon={<AddTaskIcon sx={{ color: "blue", fontSize: 30 }} />}
              checked={false}
              onClick={onChangeHandler}
            />
            <IconButton onClick={deleteNoteHandler}>
              <DeleteForeverIcon sx={{ color: "red", fontSize: 30 }} />
            </IconButton>
          </div>
        </>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <textarea
            value={formik.values.text}
            onChange={formik.handleChange("text")}
            onBlur={formik.handleBlur("text")}
          />
          <div>
            <IconButton type="submit">
              <CheckCircleIcon sx={{ color: "green", fontSize: 30 }} />
            </IconButton>
            <IconButton onClick={deleteNoteHandler}>
              <DeleteForeverIcon sx={{ color: "red", fontSize: 30 }} />
            </IconButton>
          </div>
        </form>
      )}
    </div>
  );
};

export default Note;
