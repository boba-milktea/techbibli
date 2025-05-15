import React from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, useLocation } from "react-router-dom";

import useAuthContext from "./useAuthContext";

/**
 * Custom React hook for Firebase authentication actions: sign up, sign in or sign out.
 *
 * @returns {{
 *   signup:  (userName: string, email: string, password: string) => Promise<void>,
 *   login: ( email: string, password: string) => Promise<void>,
 *   logout: () Promise<void>,
 *  isPending: Boolean ,
 *  error: string || null
 * }} An object containing:
 * - `signup`: A asynchronously function that uses firebase createUserWithEmailAndPassword to create a user; takes a username, an email and a password.
 * - `login`: A asynchronously function  that uses firebase signInWithEmailAndPassword to sign a user in; takes an email and a password.
 * - `logout`:A asynchronously function  that uses firebase signOut to sign a user out
 * - `isPending`: Indicates whether an authentication request is in progress.
 * - `error`: an error text if the authentication action falls, or `null` if no error occured.
 *
 */

export const useAuth = () => {
  const [error, setError] = React.useState(null);
  const [isPending, setIsPending] = React.useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.state?.from?.pathname || "/";

  // signup using firebase authentication
  const signup = async (userName, email, password) => {
    setError(null);
    setIsPending(true);

    try {
      if (userName === "" || email === "" || password === "") {
        throw new Error("Please complete the form");
      }
      const res = await createUserWithEmailAndPassword(auth, email, password);
      dispatch({ type: "LOGIN", payload: res.user });

      if (!res) {
        throw new Error("could not complete signup");
      }
      // add user name as displayName to the newly created user
      await updateProfile(auth.currentUser, { displayName: userName });
      setIsPending(false);
      setError(null);

      // after login, redirect to the previous page or the home page.
      // clear the page stack using replace prop

      navigate(path, { replace: true });
    } catch (err) {
      console.error(err.message);
      setError(
        err.message.replace("Firebase:", "Show the Message to your IT dept.:")
      );
      setIsPending(false);
    }
  };

  // login using firebase authentication - sign in with email and password
  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      if (email === "" || password === "") {
        throw new Error("Please complete the form");
      }
      const res = await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: "LOGIN", payload: res.user });
      setIsPending(false);
      setError(null);

      // after login, redirect to the previous page or the home page.
      // clear the page stack using replace prop
      navigate(path, { replace: true });
    } catch (err) {
      if (err.code === "auth/invalid-credential") {
        setError("Invalid email or password. Please try again.");
      } else {
        setError(`Show this message to an engineer: ${err.code} `);
      }
      setIsPending(false);
    }
  };
  // logout using firebase authentication
  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      await signOut(auth);

      dispatch({ type: "LOGOUT" });
      setIsPending(false);
    } catch (err) {
      setError(err.message.replace("Firebase:", "Message:"));
      setIsPending(false);
    }
  };

  return { login, signup, logout, isPending, error };
};
