import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { CSSTransition } from "react-transition-group";

import { ReactComponent as ArrowIcon } from "../../images/arrow.svg";
import { noteActions } from "../../store/noteSlice";
import Note from "../Study/Note";

import styles from "./Dropdown.module.css";

export const DropdownMenu = (props) => {
  const dispatch = useDispatch();

  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const [activeNote, setActiveNote] = useState();
  const dropdownRef = useRef(null);

  const { notes } = props;

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight + 25);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight + 25;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    const openNotes = { props };

    const onClickHandler = (e) => {
      if (props.goToMenu) {
        setActiveMenu(props.goToMenu);

        if (props.content) {
          const filteredNoteArray = props.content.filter(
            (note) => note.header === props.children
          );

          const filteredNote = filteredNoteArray[0];

          setActiveNote(filteredNote);
        }
      }

      if (props.setOpenNotes) {
        props.setOpenNotes(!openNotes);

        dispatch(noteActions.toggle());
      }
    };

    return (
      <a
        href="#"
        className={styles["menu-item"]}
        onClick={onClickHandler}
        notes={"a"}
      >
        <span className={styles["icon-button"]}>{props.leftIcon}</span>
        {props.children}
        <span className={styles["icon-right"]}>{props.rightIcon}</span>
      </a>
    );
  }

  const onClickHandler = (e) => {
    setActiveMenu("main");
  };

  return (
    <div
      className={styles.dropdown}
      style={{ height: menuHeight }}
      ref={dropdownRef}
    >
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames={{
          enter: styles["menu-primary-enter"],
          enterActive: styles["menu-primary-enter-active"],
          exitActive: styles["menu-primary-exit-active"],
          exit: styles["menu-primary-exit"],
        }}
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className={styles.menu}>
          <DropdownItem
            leftIcon={<ArrowIcon />}
            setOpenNotes={props.setOpenNotes}
            openNotes={props.openNotes}
          >
            BACK
          </DropdownItem>
          {notes.map((note) => (
            <DropdownItem
              key={note.header}
              goToMenu="settings"
              content={notes}
              id={note.session}
              date={note.date}
            >
              {note.header}
            </DropdownItem>
          ))}
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        timeout={500}
        classNames={{
          enter: styles["menu-secondary-enter"],
          enterActive: styles["menu-secondary-enter-active"],
          exitActive: styles["menu-secondary-exit-active"],
          exit: styles["menu-secondary-exit"],
        }}
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className={styles.menu}>
          <Note note={activeNote} goToMenu={onClickHandler} />
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            BACK
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
};

export default DropdownMenu;
