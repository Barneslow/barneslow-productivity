import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { noteActions, selectNoteLog } from "../../store/noteSlice";

import StudyBlock from "./StudyBlock";
import Notes from "./Notes";
import DropdownMenu from "../UI/Dropdown";

import styles from "./StudySession.module.css";

const DUMMY_NOTES = [
  {
    header: "Test Note 1",
    session: "e1",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis sequi saepe soluta rerum mollitia perspiciatis blanditiis libero tempora nam quisquam quasi, unde harum vero iste maiores, delectus ab laborum ipsum?",
    date: new Date(2020, 7, 14).toISOString(),
  },

  {
    header: "Test Note 2",
    session: "e1",
    content: "random text 2",
    date: new Date(2021, 2, 12).toISOString(),
  },

  {
    header: "Test Note 3",
    session: "e2",
    content: "random text 3",
    date: new Date(2021, 2, 28).toISOString(),
  },
];

const StudySession = (props) => {
  const dispatch = useDispatch();
  const noteLog = useSelector(selectNoteLog);

  const [openNotes, setOpenNotes] = useState(false);

  useEffect(() => {
    if (noteLog.length === 0) {
      dispatch(noteActions.addNote(DUMMY_NOTES));

      return;
    }

    dispatch(noteActions.addNote(noteLog));
  }, [noteLog]);

  const filteredNotes = noteLog.filter((note) => note.session === props.id);

  return (
    <div className={styles.study}>
      {!openNotes && (
        <>
          <StudyBlock date={props.date} />
          <StudyBlock time={props.time} />
          <Notes setOpenNotes={setOpenNotes} openNotes={openNotes} />
        </>
      )}

      {openNotes && (
        <DropdownMenu
          setOpenNotes={setOpenNotes}
          openNotes={openNotes}
          notes={filteredNotes}
        />
      )}
    </div>
  );
};

export default StudySession;
