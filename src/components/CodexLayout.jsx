import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const CodexLayout = () => {
  return (
    <>
      <nav>
        <NavLink to=".">Collection</NavLink>
        <NavLink to="discussion">Discussion</NavLink>
        <Outlet />
      </nav>
    </>
  );
};

export default CodexLayout;
