import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const AuthProtected = () => {
  const { user } = useAuthContext();
  const location = useLocation();

  return !user ? (
    <Navigate
      to="./login"
      state={{
        message: `Do you have a account? If so, please log in. 
          Or feel free to create a new account!`,
        from: location,
      }}
      replace
    />
  ) : (
    <Outlet />
  );
};

export default AuthProtected;
