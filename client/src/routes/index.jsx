import { createBrowserRouter } from "react-router-dom";

// =========================
// LAYOUTS
// =========================
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";

// =========================
// ROUTE GUARDS
// =========================
import ProtectedRoute from "../components/auth/ProtectedRoute";
import GuestRoute from "../components/auth/GuestRoute";

// =========================
// PUBLIC PAGES
// =========================
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

// =========================
// AUTH PAGES
// =========================
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";

// =========================
// DASHBOARD PAGES
// =========================
import Dashboard from "../pages/dashboard/Dashboard";
import Projects from "../pages/dashboard/Projects";
import Teams from "../pages/dashboard/Teams";
import Messages from "../pages/dashboard/Messages";
import Calendar from "../pages/dashboard/Calendar";
import Notifications from "../pages/dashboard/Notifications";
import Settings from "../pages/dashboard/Settings";
import Profile from "../pages/dashboard/Profile";
import Feed from "../pages/dashboard/Feed";

// =========================
// PROJECT PAGES
// =========================
import ProjectDetails from "../pages/project/ProjectDetails";

// =========================
// PROFILE PAGES
// =========================
import PublicProfile from "../pages/profile/PublicProfile";

// =========================
// SOCIAL FEATURES
// =========================
// import Feed from "../pages/feed/Feed";

// =========================
// SEARCH
// =========================
import Search from "../pages/Search";

const router = createBrowserRouter([
  // =========================
  // PUBLIC ROUTES
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
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/forgot-password",
            element: <ForgotPassword />,
          },
          {
            path: "/reset-password",
            element: <ResetPassword />,
          },
          {
            path: "/verify-email",
            element: <VerifyEmail />,
          },
        ],
      },
    ],
  },

  // =========================
  // PROTECTED ROUTES
  // =========================
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "projects",
            element: <Projects />,
          },
          {
            path: "teams",
            element: <Teams />,
          },
          {
            path: "messages",
            element: <Messages />,
          },
          {
            path: "calendar",
            element: <Calendar />,
          },
          {
            path: "notifications",
            element: <Notifications />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "feed",
            element: <Feed />,
          },
        ],
      },

      // =========================
      // SOCIAL FEED
      // =========================
      {
        path: "/feed",
        element: <Feed />,
      },
      // =========================
      // SEARCH
      // =========================
      {
        path: "/search",
        element: <Search />,
      },

      // =========================
      // PROJECT DETAILS
      // =========================
      {
        path: "/projects/:projectId",
        element: <ProjectDetails />,
      },

      // =========================
      // PUBLIC USER PROFILE
      // =========================
      {
        path: "/profile/:userId",
        element: <PublicProfile />,
      },
    ],
  },

  // =========================
  // NOT FOUND
  // =========================
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;