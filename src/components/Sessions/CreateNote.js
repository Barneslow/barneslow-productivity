import * as Yup from "yup";
import { useFormik } from "formik";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { createNoteAction } from "../../store/noteSlice";
import { useParams } from "react-router-dom";

import styles from "./CreateNote.module.css";

const formSchema = Yup.object({
  description: Yup.string().required("Text is required"),
});

const CreateNote = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    onSubmit: (values) => {
      const data = {
        id,
        description: values.description,
      };
      console.log(data);

      dispatch(createNoteAction(data));
    },

    validationSchema: formSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <textarea
        className={styles.textarea}
        value={formik.values.description}
        onChange={formik.handleChange("description")}
        onBlur={formik.handleBlur("description")}
      />
      <div>
        <IconButton type="submit">
          <CheckCircleIcon sx={{ color: "green", fontSize: 30 }} />
        </IconButton>
        <IconButton onClick={() => formik.resetForm()}>
          <CancelIcon sx={{ color: "red", fontSize: 30 }} />
        </IconButton>
      </div>
    </form>
  );
};

export default CreateNote;
