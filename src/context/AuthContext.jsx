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
    case "AUTH":
      return { ...state, user: action.payload, isAuthenticated: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
  });

  React.useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      dispatch({ type: "AUTH", payload: user });
      unsub();
    });
  }, []);

  console.log("AuthContext: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
