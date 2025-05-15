// react
import React from "react";
// hooks
import { useAuth } from "../../hooks/useAuth";
// style
import "./Signup.css";

const Signup = () => {
  const { signup, isPending, error } = useAuth();
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(userName, email, password);
  };
  return (
    <div className="login-container">
      <h1>Sign up to unlock a world of wonder.</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="user-name">User Name</label>
        <input
          type="text"
          name="user-name"
          id="user-name"
          onChange={(e) => setUserName(e.target.value)}
          placeholder="bookworm"
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="bookworm@tech.com"
        />

        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          id="password"
          min="5"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="1234567"
        />

        {!isPending ? (
          <button type="submit">Submit</button>
        ) : (
          <button disabled>Loading</button>
        )}
      </form>
    </div>
  );
};

export default Signup;
