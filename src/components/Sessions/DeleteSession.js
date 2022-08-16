import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteSessionAction } from "../../store/sessionSlice";

import Modal from "../UI/Modal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton, Tooltip } from "@mui/material";

import styles from "./DeleteSession.module.css";

const DeleteSession = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);

  const deleteNoteHandler = () => {
    setShowModal(true);
  };

  const confirmHandler = () => {
    dispatch(deleteSessionAction(id));
    navigate("/");
  };
  const cancelHandler = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <Modal>
          <h2 className={styles.header}>Are you sure?</h2>
          <div className={styles.buttons}>
            <IconButton onClick={confirmHandler}>
              <CheckCircleIcon sx={{ color: "green", fontSize: 60 }} />
            </IconButton>
            <IconButton onClick={cancelHandler}>
              <CancelIcon sx={{ color: "red", fontSize: 60 }} />
            </IconButton>
          </div>
        </Modal>
      )}
      <div className={styles.delete}>
        <Tooltip title="Delete Session">
          <IconButton onClick={deleteNoteHandler}>
            <DeleteForeverIcon
              // className={styles["delete-button"]}
              sx={{ color: "red", fontSize: 60 }}
            />
          </IconButton>
        </Tooltip>
      </div>
    </>
  );
};

export default DeleteSession;
