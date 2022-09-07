import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { CountryDropdown } from "react-country-region-selector";

import styles from "./UpdateUserSettings.module.css";
import { updateUserAction } from "../../store/userSlice";

const formSchema = Yup.object({
  userName: Yup.string().required("Username is required"),
  email: Yup.string().required("Email is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  country: Yup.string().required("Country is required"),
  bio: Yup.string().required("Bio is required"),
});

const UpdateUserSettings = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const user = useSelector((state) => state.user.user);

  const { loading, serverError, appError, userAuth } = userState;

  const formik = useFormik({
    initialValues: {
      userName: user?.userName,
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
      country: user?.country,
      bio: user?.bio,
    },

    onSubmit: (values) => {
      dispatch(updateUserAction(values));
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
          <div className="field">
            <label>Country</label>
            <CountryDropdown
              value={formik.values.country}
              onChange={formik.handleChange("country")}
            />
          </div>
        </div>
        <div className="field">
          <label>Bio</label>
          <textarea
            value={formik.values.bio}
            onChange={formik.handleChange("bio")}
            onBlur={formik.handleBlur("bio")}
            type="text"
          />
          <div className={styles.error}>
            {formik.touched.bio && formik.errors.bio}
          </div>
        </div>
      </div>
      {loading ? (
        <button disabled className=" ui button">
          Updating...
        </button>
      ) : (
        <button type="submit" className="positive ui button">
          Submit
        </button>
      )}
    </form>
  );
};

export default UpdateUserSettings;
