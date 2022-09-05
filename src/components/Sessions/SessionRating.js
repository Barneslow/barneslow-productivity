import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateSessionAction } from "../../store/sessionSlice";
import SessionStars from "../Timer/SessionStars";

import styles from "./SessionRating.module.css";

const SessionRating = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [rating, setRating] = useState(props.rating);

  useEffect(() => {
    setRating(props.rating);
  }, [props.rating]);

  const setStars = (value) => {
    setRating(value);
    const data = { id, rating: value };
    dispatch(updateSessionAction(data));
  };

  return (
    <div className={styles.container}>
      <SessionStars stars={rating} setStars={setStars} />
    </div>
  );
};

export default SessionRating;
