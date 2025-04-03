import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <Link className="site-logo" to="/">
        Techbibli
      </Link>
      <nav>
        <NavLink to="/member">Member</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/books">Books</NavLink>
      </nav>
    </header>
  );
};

export default Header;
