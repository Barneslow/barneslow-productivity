import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSessionNotesAction } from "../../store/noteSlice";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CreateNote from "./CreateNote";
import LoadingSpinner from "../UI/LoadingSpinner";
import Note from "./Note";
import NoteIcon from "@mui/icons-material/Note";

import styles from "./NotesList.module.css";

const NotesList = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const notes = useSelector((state) => state.note);
  const [createNote, setCreateNote] = useState(false);

  const { loading, appError, serverError, sessionNotes } = notes;

  useEffect(() => {
    dispatch(fetchSessionNotesAction(id));
  }, []);

  const createNoteHandler = () => {
    setCreateNote(true);
  };

  const cancelCreateNoteHandler = () => {
    setCreateNote(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <NoteIcon
            sx={{
              fontSize: 60,
              color: "white",
              background:
                "linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))",
              borderRadius: 2,
              padding: "4px",
            }}
          />
          <h2 className={styles.title}>Notes</h2>
        </div>
        <button onClick={createNoteHandler} className={styles.button}>
          <AddCircleIcon
            sx={{
              fontSize: 60,
              color: "#21ba45",
              stroke: "var(--dark-grey)",
              strokeWidth: 0.3,
              "&:hover": {
                cursor: "pointer",
                transform: "scale(.97)",
                color: "#16ab39",
              },
            }}
          />
        </button>
      </div>

      {createNote ? (
        <CreateNote cancelCreateNoteHandler={cancelCreateNoteHandler} />
      ) : (
        sessionNotes?.map((note) => {
          return <Note key={note.id} note={note} />;
        })
      )}
    </div>
  );
};

export default NotesList;

// {loading ? (
//   <LoadingSpinner />
// ) : sessionNotes?.length === 0 ? (
//   <>
//     <h1>No Notes</h1>
//     <h3>Create A Note</h3>
//     <CreateNote />
//   </>
// ) : (
//   <>
//     <div className={styles.note}>
//       <h2>Create Note</h2>
//       <CreateNote />
//     </div>
//     {sessionNotes?.map((note) => {
//       return <Note key={note.id} note={note} />;
//     })}
//   </>
// )}
