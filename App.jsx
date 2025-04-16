import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// layouts
import Layout from "./src/components/Layout";
import AuthProtected from "./src/components/AuthProtected";

// pages
import Home from "./src/pages/Home";
import About from "./src/pages/About";
import Books from "./src/pages/Books/Books";
import BookDetail from "./src/pages/Books/BookDetail";
import CodexLayout from "./src/components/CodexLayout";
import Codex from "./src/pages/Codex/Codex";
import CodexDetail from "./src/pages/Codex/CodexDetail";
import Discussion from "./src/pages/Codex/Discussion";
import Login from "./src/pages/Auth/Login";
import Signup from "./src/pages/Auth/Signup";
import Logout from "./src/pages/Auth/Logout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />

          <Route path="books" element={<Books />} />
          <Route path="books/:id" element={<BookDetail />} />

          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="logout" element={<Logout />} />

          {/* <Route element={<AuthProtected />}> */}
          <Route path="codex" element={<CodexLayout />}>
            <Route index element={<Codex />} />
            <Route path=":id" element={<CodexDetail />} />
            <Route path="discussion" element={<Discussion />} />
          </Route>
          {/* </Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
