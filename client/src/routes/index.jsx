import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Landing Pages
import Home from "../pages/Home";

// Dashboard Pages
import Dashboard from "../pages/dashboard/Dashboard";
import Projects from "../pages/dashboard/Projects";
import Teams from "../pages/dashboard/Teams";
import Messages from "../pages/dashboard/Messages";
import Calendar from "../pages/dashboard/Calendar";
import Notifications from "../pages/dashboard/Notifications";
import Settings from "../pages/dashboard/Settings";
import Profile from "../pages/dashboard/Profile";

const router = createBrowserRouter([
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
    ],
  },
]);

export default router;