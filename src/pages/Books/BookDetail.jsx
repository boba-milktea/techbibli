// react-router-dom
import { useParams } from "react-router-dom";
// hooks
import useCollectionData from "../../hooks/useCollectionData";
// style
import "./BookDetail.css";

const BookDetail = () => {
  const { id } = useParams();
  const { data: book, error, loading } = useCollectionData("books", id);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>There was an error: {error}</h1>;
  }

  return (
    <div className="book-container">
      {book && (
        <>
          <img src={book.imageUrl} alt={book.title} />
          <div className="book-detail">
            <h3>{book.title}</h3>
            <p>
              <span className="bold">Author: </span>
              {book.author}
            </p>
            <p>
              <span className="bold">Published Year: </span>
              {book.publishedYear}
            </p>
            <p>{book.description}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default BookDetail;
