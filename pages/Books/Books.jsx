import React from "react";
import { Link } from "react-router-dom";
import { getBooks } from "../../api";
import "./Books.css";

const Books = () => {
  const [books, setBooks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function loadBooks() {
      setLoading(true);
      try {
        const bookData = await getBooks();
        setBooks(bookData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadBooks();
  }, []);

  const bookElements = books.map((book) => (
    <div key={book.id} className="book-card">
      <Link to={book.id}>
        <img src={book.imageUrl} alt={book.title} />
        <div className="book-detail">
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Published Year: {book.publishedYear}</p>
        </div>
      </Link>
    </div>
  ));

  return (
    <div className="container">
      <h1>Check out our collection</h1>
      <div className="book-list">{bookElements}</div>
    </div>
  );
};
export default Books;
