import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSessionAction } from "../../store/sessionSlice";
import Card from "../UI/Card";
import styles from "./Session.module.css";
import SessionNotes from "./SessionsNotes";
import SessionStats from "./SessionStats";
import SessionStars from "../Timer/SessionStars";
import SessionRating from "./SessionRating";

const Session = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { session } = useSelector((state) => state.session);

  useEffect(() => {
    dispatch(fetchSessionAction(id));
  }, [session?.rating]);

  return (
    <div className={styles.container}>
      <Card>
        <SessionStats session={session} />
        <SessionRating rating={session?.rating} />
        <SessionNotes />
      </Card>
    </div>
  );
};

export default Session;
