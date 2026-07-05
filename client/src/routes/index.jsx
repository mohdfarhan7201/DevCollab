import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import GuestRoute from "../components/auth/GuestRoute";

// Landing
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

// Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";

// Dashboard
import Dashboard from "../pages/dashboard/Dashboard";
import Projects from "../pages/dashboard/Projects";
import Teams from "../pages/dashboard/Teams";
import Messages from "../pages/dashboard/Messages";
import Calendar from "../pages/dashboard/Calendar";
import Notifications from "../pages/dashboard/Notifications";
import Settings from "../pages/dashboard/Settings";
import Profile from "../pages/dashboard/Profile";

// 🔥 FEED (NEW FEATURE)
import Feed from "../pages/feed/Feed";

const router = createBrowserRouter([
  // =========================
  // PUBLIC LANDING
  // =========================
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },

  // =========================
  // AUTH ROUTES (GUEST ONLY)
  // =========================
  {
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/register", element: <Register /> },
          { path: "/forgot-password", element: <ForgotPassword /> },
          { path: "/reset-password", element: <ResetPassword /> },
          { path: "/verify-email", element: <VerifyEmail /> },
        ],
      },
    ],
  },

  // =========================
  // PROTECTED APP ROUTES
  // =========================
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Dashboard /> },

          // Dashboard modules
          { path: "projects", element: <Projects /> },
          { path: "teams", element: <Teams /> },
          { path: "messages", element: <Messages /> },
          { path: "calendar", element: <Calendar /> },
          { path: "notifications", element: <Notifications /> },
          { path: "settings", element: <Settings /> },
          { path: "profile", element: <Profile /> },
        ],
      },

      // 🔥 FEED SYSTEM (SOCIAL FEATURE)
      {
        path: "/feed",
        element: <Feed />,
      },
    ],
  },

  // =========================
  // 404 PAGE
  // =========================
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;