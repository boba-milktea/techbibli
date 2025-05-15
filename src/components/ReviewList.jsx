import useAddRemoveReview from "../hooks/useAddRemoveReview";
import useAuthContext from "../hooks/useAuthContext";
import Rating from "./Rating";
import { MdOutlineDeleteForever } from "react-icons/md";
import "./ReviewList.css";

const ReviewList = ({ reviewList }) => {
  const { user } = useAuthContext();
  const { deleteReview } = useAddRemoveReview("reviews");

  if (!reviewList || reviewList.length === 0) {
    return <p>Leave a review.</p>;
  }

  const reviewElements = reviewList.map((review) => {
    return (
      <div className="review-card" key={review.id}>
        <p>
          <span className="bold">User: </span>
          {review.userName}
        </p>
        <p>
          <span className="bold">Rating: </span>
          <Rating userRating={review.rating} readOnly={true} style={{}}/>
        </p>
        <p>
          <span className="bold">Comment: </span>
          {review.comment}
        </p>
        {user.displayName === review.userName && (
          <MdOutlineDeleteForever
            className="delete-btn"
            onClick={() => deleteReview(review.id)}
          >
            X
          </MdOutlineDeleteForever>
        )}
      </div>
    );
  });

  return <div className="reviews">{reviewElements}</div>;
};

export default ReviewList;
