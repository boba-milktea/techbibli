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

  return (
    <div className="book-container">
      {book && (
        <>
          <img src={book.imageUrl} alt={book.title} />
          <div className="book-detail">
            <h3>{book.title}</h3>
            <p>
              <span class="bold">Author: </span>
              {book.author}
            </p>
            <p>
              <span class="bold">Published Year: </span>
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
