// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRole }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) {
    return <Navigate to="/customer-login" />;
  }

  if (user.role !== allowedRole) {
    return <Navigate to="/customer-portal" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
