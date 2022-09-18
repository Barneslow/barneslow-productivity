import * as Yup from "yup";
import { useFormik } from "formik";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch } from "react-redux";
import { createNoteAction } from "../../store/noteSlice";
import { useParams } from "react-router-dom";
import { dateFormatter } from "../../utils/dateFormater";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import styles from "./Note.module.css";

const formSchema = Yup.object({
  description: Yup.string().required("Text is required"),
});

const CreateNote = ({ cancelCreateNoteHandler }) => {
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

      dispatch(createNoteAction(data));
      cancelCreateNoteHandler(false);
    },

    validationSchema: formSchema,
  });

  return (
    <div className={`${styles.note} ${styles.green}`}>
      <h2 className={styles.create}>Create A Note</h2>
      <h3 className={styles.date}>
        <CalendarMonthIcon sx={{ fontSize: 30, color: "var(--dark-grey)" }} />
        {dateFormatter(new Date())}
      </h3>
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
          <button onClick={cancelCreateNoteHandler} className={styles.button}>
            <CancelIcon sx={{ color: "red", fontSize: 30 }} />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;
