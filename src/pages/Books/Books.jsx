import React from "react";
import { Link } from "react-router-dom";
import normalisation from "../../utils/normalisation";
import { getBooks } from "../../../api";
import useCategoryFilter from "../../hooks/useCategoryFilter";
import "./Books.css";

const Books = () => {
  const [books, setBooks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { displayedBooks, categories, handleFilter } = useCategoryFilter(books);

  // fetch the books
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

  // create book dom elements
  const bookElements = displayedBooks.map((book) => {
    return (
      <div key={book.id} className="book-card">
        <Link to={book.id}>
          <img src={book.imageUrl} alt={book.title} />
          <div className="book-detail">
            <h3>{book.title}</h3>
            <p>
              <span className="bold">Author</span>: {book.author}
            </p>
            <p>
              <span className="bold">Published Year</span>: {book.publishedYear}
            </p>
            <p>
              <span className="bold">Category</span>: {book.category}
            </p>
          </div>
        </Link>
      </div>
    );
  });

  // create filter link elements
  const categoryLinkElements = categories.map((category) => (
    <button
      key={category}
      className="book-category-btn"
      onClick={() => {
        handleFilter("category", category.toLowerCase());
      }}
    >
      {category}
    </button>
  ));

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>There was an error: {error}</h1>;

  return (
    <div className="container">
      <h1>Check out our collection</h1>
      <div className="book-list-filter">
        <span className="bold">Category</span>: {categoryLinkElements}
      </div>
      <div className="book-list">{bookElements}</div>
    </div>
  );
};
export default Books;
