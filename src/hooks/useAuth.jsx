import React from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../api";
import { useNavigate, useLocation } from "react-router-dom";

import useAuthContext from "./useAuthContext";

export const useAuth = () => {
  const [error, setError] = React.useState(null);
  const [isPending, setIsPending] = React.useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.state?.from?.pathname || "/codex";

  const signup = async (userName, email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      dispatch({ type: "LOGIN", payload: res.user });

      if (!res) {
        throw new Error("could not complete signup");
      }
      // add user name as displayName to the newly created user
      await updateProfile(auth.currentUser, { displayName: userName });
      setIsPending(false);
      setError(null);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: "LOGIN", payload: res.user });
      setIsPending(false);
      setError(null);

      // after login, redirect to the codex page, clear the page stack using replace prop
      navigate(path, { replace: true });
    } catch (err) {
      setError(err.message.replace("Firebase:", "Message:"));
      setIsPending(false);
    }
  };

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
