import React from "react";
import { TiStarFullOutline } from "react-icons/ti";

// handleClick function is currently broken

const Rating = ({ userRating, handleClick }) => {
  return (
    <>
      {[...Array(5)].map((_, i) => {
        const value = i + 1;
        return (
          <label key={i} htmlFor="rating">
            <TiStarFullOutline
              className="star"
              color={value <= userRating ? "#FFD700" : "lightgray"}
            />

            <input
              type="radio"
              name="rating"
              id="rating"
              value={value}
              onClick={() => handleClick(value)}
            />
          </label>
        );
      })}
    </>
  );
};

export default Rating;
