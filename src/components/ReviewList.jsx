import useAddRemoveReview from "../hooks/useAddRemoveReview";
import "./ReviewList.css";
import useAuthContext from "../hooks/useAuthContext";

const ReviewList = ({ reviewList }) => {
  const { user } = useAuthContext();
  const { deleteReview } = useAddRemoveReview("reviews");

  if (!reviewList || reviewList.length === 0) {
    return <p>Leave a review.</p>;
  }

  const reviewElements = reviewList.map((review) => {
    return (
      <div key={review.id}>
        <p>
          <span className="bold">User: </span>
          {review.userName}
        </p>
        <p>
          <span className="bold">Rating: </span>
          {review.rating}
        </p>
        <p>
          <span className="bold">Comment: </span>
          {review.comment}
        </p>
        {user.displayName === review.userName && (
          <button onClick={() => deleteReview(review.id)}>X</button>
        )}
        <hr />
      </div>
    );
  });

  return <div className="reviews">{reviewElements}</div>;
};

export default ReviewList;
