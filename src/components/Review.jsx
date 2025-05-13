import React from "react";
import Rating from "./Rating";
import ReviewList from "./ReviewList";
import useAddRemoveReview from "../hooks/useAddRemoveReview";
import useCollectionData from "../hooks/useCollectionData";
import useSubscription from "../hooks/useSubscription";

import { collection, query, where, orderBy } from "firebase/firestore";
import { db } from "../../api";

import "./Review.css";

const Review = ({ userName, codexId }) => {
  const { data: initialReviews, loading, error } = useCollectionData("reviews");
  const [rating, setRating] = React.useState(null);
  const [reviewList, setReviewList] = React.useState(initialReviews);
  const { addReview } = useAddRemoveReview("reviews");

  const reviewQuery = query(
    collection(db, "reviews"),
    where("codexId", "==", codexId),
    orderBy("createdTime", "desc")
  );

  const { subscribe } = useSubscription(reviewQuery);

  // Subscribe to collection for real-time updates
  React.useEffect(() => {
    const unsubscribe = subscribe((documents) => {
      setReviewList(documents);
    });
    return () => unsubscribe();
  }, [subscribe]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const comment = formData.get("comment");
    const rating = formData.get("rating");
    await addReview({ userName, codexId, rating, comment });
    formEl.reset();
    setRating(null);
  };

  return (
    <div className="review">
      <h2>What do you think about this book?</h2>
      <form onSubmit={handleSubmit}>
        <div className="rating">
          <Rating userRating={rating} handleClick={setRating} />
        </div>
        <div className="comment">
          <label htmlFor="comment">comment:</label>
          <textarea id="comment" name="comment" />
        </div>
        <button className="send-btn" type="submit">
          Send
        </button>
      </form>
      <ReviewList reviewList={reviewList} />
    </div>
  );
};

export default Review;
