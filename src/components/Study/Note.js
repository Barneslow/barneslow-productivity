import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectNoteLog, noteActions } from "../../store/noteSlice";

import styles from "./Note.module.css";

const Note = (props) => {
  const dispatch = useDispatch();
  const noteLog = useSelector(selectNoteLog);
  const noteInputRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const { note } = props;

  const [noteContent, setNoteContent] = useState(note.content);

  const editNoteTextHandler = (e) => {
    setIsEditing(!isEditing);
  };

  const changeTextHandler = (e) => {
    setNoteContent(e.target.value);
  };

  const deleteNoteHandler = () => {
    const newArr = noteLog.filter((content) => content.header !== note.header);

    dispatch(noteActions.addNote(newArr));
    props.goToMenu();
  };

  const saveChangesHandler = (e) => {
    e.preventDefault();

    const newNote = { ...props.note, content: noteInputRef.current.value };
    const selectedNote = noteLog.filter((note) => {
      return note.header !== newNote.header;
    });

    const newNoteLog = [newNote, ...selectedNote];

    dispatch(noteActions.addNote(newNoteLog));
    setIsEditing(!isEditing);
  };

  return (
    <>
      {!isEditing && (
        <>
          <div className="ui segment">
            <p>{noteContent}</p>
          </div>
          <div className={styles.buttons}>
            <button className="ui blue button" onClick={editNoteTextHandler}>
              Edit Note
            </button>
            <button className="ui red button" onClick={deleteNoteHandler}>
              Delete Note
            </button>
          </div>
        </>
      )}

      {isEditing && (
        <form onSubmit={saveChangesHandler}>
          <textarea
            className={styles.input}
            onChange={changeTextHandler}
            value={noteContent}
            ref={noteInputRef}
            autoFocus
          ></textarea>
          <div className="ui buttons">
            <button className="ui red button" onClick={editNoteTextHandler}>
              Cancel
            </button>
            <div className="or"></div>
            <button className="ui positive button" type="submit">
              Save Changes
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default Note;
