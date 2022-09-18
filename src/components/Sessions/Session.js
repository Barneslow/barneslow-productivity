import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSessionAction } from "../../store/sessionSlice";
import styles from "./Session.module.css";
import SessionStats from "./SessionStats";
import SessionRating from "./SessionRating";
import FormattedDate from "../UI/FormattedDate";
import NotesList from "../Notes/NotesList";
import SessionGraphs from "./SessionGraphs";

const Session = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { session } = useSelector((state) => state.session);

  useEffect(() => {
    dispatch(fetchSessionAction(id));
  }, [id]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <FormattedDate date={session?.createdAt} />
      </div>
      <div className={styles.container}>
        <div className={styles.block}>
          <SessionGraphs session={session} />
        </div>

        <div className={styles.block}>
          <SessionStats session={session} />
        </div>

        <div className={styles.block}>
          <NotesList />
        </div>

        <div className={styles.block}>
          <SessionRating rating={session?.rating} />
        </div>
      </div>
    </div>
  );
};

export default Session;
