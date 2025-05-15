// react-router-dom
import { Link } from "react-router-dom";
// hooks
import useCategoryFilter from "../../hooks/useCategoryFilter";
import useCollectionData from "../../hooks/useCollectionData";

const Codex = () => {
  const { data: codex, error, loading } = useCollectionData("codex");

  const { displayedBooks, handleFilter, categories } = useCategoryFilter(codex);

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
          <div className="book-image">
            <img src={note.imageUrl} alt={note.title} />
          </div>
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
