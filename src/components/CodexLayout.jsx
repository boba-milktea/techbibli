// react-router-dom
import { NavLink, Outlet } from "react-router-dom";

const CodexLayout = () => {
  return (
    <>
      <nav>
        <NavLink to=".">Collection</NavLink>
      </nav>
      <Outlet />
    </>
  );
};

export default CodexLayout;
