//resource - https://goalkicker.com/TypeScriptBook2/
import React from "react";
import { useParams } from "react-router-dom";
import "./CodexResource.css";

const CodexResource = () => {
  const [book, setBook] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { id } = useParams();

  return <div className="book-container">The book</div>;
};

export default CodexResource;
