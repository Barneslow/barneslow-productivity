import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { updateUserAction } from "../../store/userSlice";

import styles from "./UpdateUserProfile.module.css";

const formSchema = Yup.object({
  userName: Yup.string().required("Username is required"),
  email: Yup.string().required("Email is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
});

const UpdateUserProfile = (props) => {
  const dispatch = useDispatch();
  const { user } = props;

  const formik = useFormik({
    initialValues: {
      userName: user.userName,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },

    onSubmit: (values) => {
      console.log(values);
      dispatch(updateUserAction(values));
      props.onClose();
    },
    validationSchema: formSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="ui equal width form">
        <div className="fields">
          <div className="field">
            <label>UserName</label>
            <input
              value={formik.values.userName}
              onChange={formik.handleChange("userName")}
              onBlur={formik.handleBlur("userName")}
              type="text"
            />
            <div className={styles.error}>
              {formik.touched.userName && formik.errors.userName}
            </div>
          </div>
          <div className="field">
            <label>Email</label>
            <input
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
              type="email"
            />
            <div className={styles.error}>
              {formik.touched.email && formik.errors.email}
            </div>
          </div>
        </div>
        <div className="fields">
          <div className="field">
            <label>First name</label>
            <input
              value={formik.values.firstName}
              onChange={formik.handleChange("firstName")}
              onBlur={formik.handleBlur("firstName")}
              type="text"
            />
            <div className={styles.error}>
              {formik.touched.firstName && formik.errors.firstName}
            </div>
          </div>
          <div className="field">
            <label>Last name</label>
            <input
              value={formik.values.lastName}
              onChange={formik.handleChange("lastName")}
              onBlur={formik.handleBlur("lastName")}
              type="text"
            />
            <div className={styles.error}>
              {formik.touched.lastName && formik.errors.lastName}
            </div>
          </div>
        </div>
      </div>
      <button type="button" onClick={props.onClose} className="ui red button">
        Cancel
      </button>
      <button type="submit" value="Submit" className="ui green button">
        Update Settings
      </button>
    </form>
  );
};

export default UpdateUserProfile;
