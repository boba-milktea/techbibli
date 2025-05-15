// react-router-dom
import { useSearchParams } from "react-router-dom";
// util
import extractCategory from "../utils/extractCategory";
import normalisation from "../utils/normalisation";

/**
 * Custom React hook to filter the displayed book by category.
 *
 * @param {Array<Object>} books - all the book documents
 * @returns {{
 *   displayedBooks:  Array<Object>
 *   handleFilter: (key: string, value: string || null) => void,
 *   categories: Array<String>
 * }} An object containing:
 * - `displayedBooks`: An array of book objects filtered by the selected category
 * - `handleFilter`: A function that updates the category filter in the URL; takes a key and a value as the parameter.
 * - `categories`: A list of unique categories extracted from the books
 *
 */

const useCategoryFilter = (books) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  // filter the books by category
  const displayedBooks = categoryFilter
    ? books.filter((book) =>
        normalisation(book.category).includes(categoryFilter)
      )
    : books;

  const categories = extractCategory(books);

  // handle filter query from books and codex
  const handleFilter = (key, value) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      if (value === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, normalisation(value));
      }
      return newParams;
    });
  };

  return {
    displayedBooks,
    handleFilter,
    categories,
  };
};

export default useCategoryFilter;
