import React from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * Custom React hook to access the authentication context
 *
 * @returns {{
 *  state: object,
 *  dispatch: Function
 * }} an object containing -
 *
 * - state: the current authentication state (e.g. user info, login state)
 * - dispatch function to update the auth state
 *
 */

const useAuthContext = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw Eorror("useAuthContext must be inside an AuthContextProvider");
  }
  return context;
};

export default useAuthContext;
