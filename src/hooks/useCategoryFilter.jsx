import React from "react";

import { useSearchParams } from "react-router-dom";
import extractCategory from "../utils/extractCategory";
import normalisation from "../utils/normalisation";

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

  // handle filter query
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
    categoryFilter,
    displayedBooks,
    handleFilter,
    categories,
  };
};

export default useCategoryFilter;
