import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const UserRoute = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return user && user ? <Outlet /> : <Navigate to="/login" />;
};

export default UserRoute;
