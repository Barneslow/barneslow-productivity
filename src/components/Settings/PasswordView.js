import { useState } from "react";

import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";

import styles from "./PasswordView.module.css";

const PasswordView = (props) => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const className = props.error ? "input-field-error" : "input-field";

  return (
    <div className={styles.wrapper}>
      <div className={styles[`${className}`]}>
        <input
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
          type={type}
        />
        <span onClick={handleToggle}>
          <Icon icon={icon} size={25} />
        </span>
      </div>
    </div>
  );
};

export default PasswordView;
