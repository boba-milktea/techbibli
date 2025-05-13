import "./Login.css";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

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
      <h1>Please Sign in</h1>
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
      <div className="sign-up">
        <p>Need an account?</p>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
