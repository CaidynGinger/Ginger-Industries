import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../components/Hooks/useAuth";

export const RequireAuth = ({ allowedRoles }) => {
  const { Auth } = useAuth();
  const location = useLocation();

  console.log(Auth);
  console.log(allowedRoles);
  return Auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : Auth?.accessToken ? (
    <Navigate to="/Unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};
