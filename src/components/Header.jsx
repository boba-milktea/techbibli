// react-router-dom
import { Link, NavLink } from "react-router-dom";
// hoooks
import useAuthContext from "../hooks/useAuthContext";
import { useAuth } from "../hooks/useAuth";
// style
import "./Header.css";

const Header = () => {
  const { logout } = useAuth();
  const { user } = useAuthContext();

  return (
    <header>
      <Link className="site-logo" to="/">
        Techbibli
      </Link>
      <nav>
        {user && <span className="user-name">Hi, {user.displayName}</span>}
        <NavLink
          to="/codex"
          className={({ isActive }) => (isActive ? "active" : null)}
        >
          Codex
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : null)}
        >
          About
        </NavLink>
        <NavLink
          to="/books"
          className={({ isActive }) => (isActive ? "active" : null)}
        >
          Books
        </NavLink>
        {!user ? (
          <NavLink to="/login">Login</NavLink>
        ) : (
          <NavLink to="/logout" onClick={logout}>
            Logout
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
