import { useAuth } from "../../context/auth";
import { Navigate, useLocation } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
