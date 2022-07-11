import React from "react";

import styles from "./FormInput.module.css";

const FormInput = React.forwardRef((props, ref) => {
  const { label } = props;

  return (
    <div className={styles.form}>
      <label>{label}</label>
      <input ref={ref} {...props} />
    </div>
  );
});

export default FormInput;
