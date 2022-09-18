import { useState } from "react";

import styles from "./SessionStars.module.css";
import Star from "./Star";

const SessionStars = (props) => {
  const maxRating = [1, 2, 3, 4, 5];
  const { setStars, stars } = props;

  return (
    <div className={styles.container}>
      {maxRating.map((item, key) => {
        if (stars >= item) {
          return (
            <Star
              key={key}
              rating={true}
              onClick={() => {
                setStars(item);
              }}
            />
          );
        } else {
          return (
            <Star
              key={key}
              rating={false}
              onClick={() => {
                setStars(item);
              }}
            />
          );
        }
      })}
    </div>
  );
};

export default SessionStars;
