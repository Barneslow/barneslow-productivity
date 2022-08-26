const UpdateButtons = (props) => {
  return (
    <>
      <button type="button" onClick={props.onClose} className="ui red button">
        Cancel
      </button>
      <button type="submit" value="Submit" className="ui green button">
        Update Settings
      </button>
    </>
  );
};

export default UpdateButtons;
