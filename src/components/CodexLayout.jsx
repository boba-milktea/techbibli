import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const CodexLayout = () => {
  return (
    <>
      <nav>
        <NavLink to=".">Collection</NavLink>
        <NavLink to="discussion">Discussion</NavLink>
      </nav>
      <Outlet />
    </>
  );
};

export default CodexLayout;
