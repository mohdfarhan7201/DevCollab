import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import AuthLoader from "./AuthLoader";

export default function GuestRoute() {
  const {
    loading,
    isAuthenticated,
  } = useAuth();

  if (loading) {
    return (
      <AuthLoader
        title="Preparing authentication..."
        description="Checking your current session."
      />
    );
  }

  if (isAuthenticated) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return <Outlet />;
}