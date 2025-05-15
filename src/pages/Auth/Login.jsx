// react-router-dom
import { Link, useLocation } from "react-router-dom";
// hooks
import { useAuth } from "../../hooks/useAuth";
// style
import "./Login.css";

const Login = () => {
  const location = useLocation();
  const { login, isPending, error } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const email = formData.get("email");
    const password = formData.get("password");
    login(email, password);

    formEl.reset();
  };

  return (
    <div className="login-container">
      <h1>Back again? The magic awaits</h1>
      {location.state?.message && (
        <p className="message">{location.state.message}</p>
      )}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="bookworm@tech.com"
        />

        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          id="password"
          min="5"
          placeholder="1234567"
        />

        <button type="submit">{!isPending ? "Log in" : "Submitting..."}</button>
      </form>
      <div className="login-links">
        <p>Need An Account?</p>
        <Link to="/signup">Sign Up</Link>
      </div>
      <div className="login-links">
        <p>Lost Your Password?</p>
        <Link to="/resetPW">Reset Password</Link>
      </div>
    </div>
  );
};

export default Login;
