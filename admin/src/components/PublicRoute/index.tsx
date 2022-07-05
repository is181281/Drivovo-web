import React from "react";
import { Navigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks";

const PublicRoute = ({ children }: any): JSX.Element => {
  const { isAuthorized } = useTypedSelector((state) => state.auth);

  return isAuthorized ? <Navigate to="/" /> : children;
};

export default PublicRoute;
