import React from "react";
import { useParams } from "react-router-dom";
import { getBook } from "../../api";
import "./BookDetail.css";

const BookDetail = () => {
  const [book, setBook] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const { id } = useParams();

  React.useEffect(() => {
    async function loadBook() {
      setLoading(true);
      try {
        const bookData = await getBook(id);
        setBook(bookData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadBook();
  }, [id]);

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
