import React from "react";
import { Navigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks";

const PrivateRoute = ({ children }: any): JSX.Element => {
  const { isAuthorized } = useTypedSelector((state) => state.auth);

  return isAuthorized ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
