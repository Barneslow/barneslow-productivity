import styles from "./AccountSettings.module.css";

const AccountSettings = (props) => {
  return (
    <div className={styles.container}>
      <h2 className="ui header">
        <i className="settings icon"></i>
        <div className="content">
          Account Settings
          <div className="sub header">Manage your preferences</div>
        </div>
      </h2>
    </div>
  );
};

export default AccountSettings;
