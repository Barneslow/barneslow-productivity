import * as Yup from "yup";
import { useFormik } from "formik";

import UpdateUserSettings from "./UpdateUserSettings";
import ChangePassword from "./ChangePassword";

import styles from "./Settings.module.css";
import AccountSettingsTitle from "../User/AccountSettingsTitle";
import PasswordView from "./PasswordView";
import UpdateUserGoals from "./UpdateUserGoals";

const Settings = () => {
  return (
    <div className={styles["settings-container"]}>
      <AccountSettingsTitle />
      <UpdateUserSettings />
      <UpdateUserGoals />
      <ChangePassword />
    </div>
  );
};

export default Settings;
