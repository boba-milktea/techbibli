import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const AuthProtected = () => {
  const { user, authIsReady } = useAuthContext();
  const location = useLocation();

  // see if Firebase has finished checking auth state yet, if not, return loading
  if (!authIsReady) return <h3>Loading...</h3>;

  return user ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
      state={{
        message: `Wand at the ready? Log in to return.  First time here? Enroll and let the magic begin!`,
        from: location,
      }}
    />
  );
};

export default AuthProtected;
