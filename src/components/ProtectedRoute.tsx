import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRole }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); // You must store user data after login

  if (!token || !user) {
    return <Navigate to="/customer-login" />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/customer-portal" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
