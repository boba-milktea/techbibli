import { AuthContext } from "../context/AuthContext";

import React from "react";

const useAuthContext = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw Eorror("useAuthContext must be inside an AuthContextProvider");
  }
  return context;
};

export default useAuthContext;
