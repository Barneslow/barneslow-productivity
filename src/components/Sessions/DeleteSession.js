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
    <div className={styles.container}>
      {showModal && (
        <Modal>
          <h2 className={styles.header}>Are you sure?</h2>
          <div className={styles.buttons}>
            <IconButton onClick={confirmHandler}>
              <CheckCircleIcon sx={{ color: "green", fontSize: { sm: 60 } }} />
            </IconButton>
            <IconButton onClick={cancelHandler}>
              <CancelIcon sx={{ color: "red", fontSize: 60 }} />
            </IconButton>
          </div>
        </Modal>
      )}
      <Tooltip title="Delete Session">
        <DeleteForeverIcon
          onClick={deleteNoteHandler}
          sx={{
            color: "red",
            fontSize: { sm: 40, md: 60 },
            background: "var(--light-grey-gradient)",
            border: 1,
            borderColor: "var(--dark-grey)",
            borderRadius: 2,
            boxShadow: "var(--button-box-shadow)",
            "&:hover": {
              cursor: "pointer",
              transform: "scale(.97)",
            },
          }}
        />
      </Tooltip>
    </div>
  );
};

export default DeleteSession;
