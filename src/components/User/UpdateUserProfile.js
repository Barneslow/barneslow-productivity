import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/authSlice";

const UpdateUserProfile = (props) => {
  const { user } = props;
  const usernameRef = useRef();
  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();

  const logData = (e) => {
    e.preventDefault();

    const data = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
    };
  };

  return (
    <form onSubmit={logData}>
      <div className="ui equal width form">
        <div className="fields">
          <div className="field">
            <label>UserName</label>
            <input type="text" placeholder={user.userName} ref={usernameRef} />
          </div>
          <div className="field">
            <label>Email</label>
            <input type="email" placeholder={user.email} ref={emailRef} />
          </div>
        </div>
        <div className="fields">
          <div className="field">
            <label>First name</label>
            <input
              type="text"
              placeholder={user.firstName}
              ref={firstNameRef}
            />
          </div>
          <div className="field">
            <label>Last name</label>
            <input type="text" placeholder={user.lastName} ref={lastNameRef} />
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
