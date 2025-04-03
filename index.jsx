import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// layouts

import Layout from "./components/Layout";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Books from "./pages/Books/Books";
import BookDetail from "./pages/Books/BookDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
