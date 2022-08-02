import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSessionNotesAction } from "../../store/noteSlice";
import CreateNote from "./CreateNote";
import LoadingSpinner from "../UI/LoadingSpinner";
import Note from "./Note";

import styles from "./SessionsNotes.module.css";

const SessionNotes = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const notes = useSelector((state) => state.note);

  const { loading, appError, serverError, sessionNotes } = notes;

  useEffect(() => {
    dispatch(fetchSessionNotesAction(id));
  }, []);

  return (
    <>
      <h2 className={styles.title}>Session Notes</h2>
      {loading ? (
        <LoadingSpinner />
      ) : sessionNotes?.length === 0 ? (
        <>
          <h1>No Notes</h1>
          <h3>Create A Note</h3>
          <CreateNote />
        </>
      ) : (
        <>
          <div className={styles.note}>
            <h2>Create Note</h2>
            <CreateNote />
          </div>
          {sessionNotes?.map((note) => {
            return <Note key={note.id} note={note} />;
          })}
        </>
      )}
    </>
  );
};

export default SessionNotes;
