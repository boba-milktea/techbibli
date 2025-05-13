import React from "react";
import { auth } from "../../api";

export const AuthContext = React.createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "LOGOUT":
      return { ...state, user: null, isAuthenticated: false };
    case "SIGNUP":
      return { ...state, user: null, isAuthenticated: false };
    case "AUTH_IS_READY":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payLoad,
        authIsReady: true,
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  // use useReducer to manager the states of login, logout, signup and auth
  const [state, dispatch] = React.useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    authIsReady: false,
  });

  // use firebase onAuthStateChanged to get the currently signed-in user. It reacts to changes.
  React.useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
    });
    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
