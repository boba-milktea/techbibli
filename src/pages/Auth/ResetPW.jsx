// react-router-dom
import { Link } from "react-router-dom";
// hooks
import { useAuth } from "../../hooks/useAuth";
// style
import "./ResetPW.css";

const ResetPW = () => {
  const { resetPassword, isPending, error, isReset } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const email = formData.get("email");
    resetPassword(email);
    formEl.reset();
  };

  return (
    <div className="login-container">
      <h1>Need to reset the password?</h1>
      {error && <p className="error">{error}</p>}
      {isReset && (
        <div className="reset-message">
          <p>
            Reset link sent! Check your email and go back to
            <Link to="/login">Log-in</Link>?
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="bookworm@tech.com"
        />
        <button type="submit">
          {!isPending ? "Send" : "Sending Reset PW Email..."}
        </button>
      </form>
      <div className="login-links">
        <p>Need an account?</p>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default ResetPW;
