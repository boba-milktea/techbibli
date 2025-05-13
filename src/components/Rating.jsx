import { TiStarFullOutline } from "react-icons/ti";
import "./Rating.css";

const Rating = ({ userRating, handleClick = null, readOnly = false }) => {
  return (
    <>
      {[...Array(5)].map((_, i) => {
        const value = i + 1;
        return (
          <label key={i}>
            <TiStarFullOutline
              className={`star ${readOnly ? "readonly" : ""}`}
              color={value <= userRating ? "#FFD700" : "lightgray"}
              style={{ cursor: !readOnly ? "pointer" : "default" }}
            />

            {!readOnly && (
              <input
                type="radio"
                name="rating"
                id="rating"
                value={value}
                onClick={() => handleClick(value)}
              />
            )}
          </label>
        );
      })}
    </>
  );
};

export default Rating;
