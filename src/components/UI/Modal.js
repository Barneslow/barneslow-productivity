import React from "react";
import ReactDom from "react-dom";
import styles from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = React.forwardRef((props, ref) => {
  return (
    <div className={styles.modal} ref={ref}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
});

const portalElement = document.getElementById("overlays");

const Modal = React.forwardRef((props, ref) => {
  return (
    <>
      {ReactDom.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDom.createPortal(
        <ModalOverlay ref={ref}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
});

export default Modal;
