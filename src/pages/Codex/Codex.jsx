import React from "react";
import "./Codex.css";
import { Link } from "react-router-dom";
import { getCodex } from "../../../api";
import useCategoryFilter from "../../hooks/useCategoryFilter";

const Codex = () => {
  const [codex, setCodex] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const { displayedBooks, handleFilter, categories } = useCategoryFilter(codex);

  React.useEffect(() => {
    async function loadCodex() {
      setLoading(true);
      try {
        const codexData = await getCodex();
        setCodex(codexData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadCodex();
  }, []);

  const categoryLinkElements = categories.map((category) => (
    <button
      key={category}
      className="book-category-btn"
      onClick={() => {
        handleFilter("category", category);
      }}
    >
      {category}
    </button>
  ));

  const codexElements = displayedBooks.map((note) => {
    return (
      <div key={note.id} className="book-card">
        <Link to={note.id}>
          <img src={note.imageUrl} alt={note.title} />
          <div className="book-detail">
            <h3>{note.title}</h3>
            <p>
              <span className="bold">Category</span>: {note.category}
            </p>
            <p>
              <span className="bold">Pages</span>: {note.pages}
            </p>
            <p>
              <span className="bold">Published</span>: {note.publishedDate}
            </p>
            <p>
              <span className="bold">Source</span>: {note.source}
            </p>
          </div>
        </Link>
      </div>
    );
  });

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>There was an error: {error}</h1>;

  return (
    <div className="container">
      <h1>Available Codex</h1>
      <div className="book-list-filter">
        <span className="bold">Category</span>: {categoryLinkElements}
      </div>
      <div className="book-list">{codexElements}</div>
    </div>
  );
};

export default Codex;
