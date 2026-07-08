import { Link } from "react-router-dom";
import {
  Bell,
  Search,
  Sun,
  Moon,
  Menu,
  Plus,
  LogOut,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { getNotificationsApi } from "../../api/notification.api";

export default function Topbar({ onMenuClick }) {
  const { theme, setTheme } = useTheme();

  const { user, logout } = useAuth();

  const [unreadCount, setUnreadCount] =
    useState(0);

  useEffect(() => {
    const loadNotifications =
      async () => {
        try {
          const notifications =
            await getNotificationsApi();

          const unread =
            notifications.filter(
              (item) => !item.isRead
            ).length;

          setUnreadCount(unread);
        } catch (error) {
          console.log(error);
        }
      };

    loadNotifications();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-4 px-4 lg:px-8">

        {/* Left */}

        <div className="flex items-center gap-3">

          <button
            onClick={onMenuClick}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border hover:bg-muted lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="relative hidden md:block">

            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="text"
              placeholder="Search projects, developers..."
              className="h-11 w-80 rounded-xl border border-border bg-muted/40 pl-10 pr-4 text-sm outline-none transition focus:border-primary"
            />

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          <Link
            to="/projects/create"
            className="hidden items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 md:flex"
          >
            <Plus className="h-4 w-4" />
            New Project
          </Link>

          <button
            onClick={() =>
              setTheme(
                theme === "dark"
                  ? "light"
                  : "dark"
              )
            }
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border hover:bg-muted"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          <Link
            to="/notifications"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border hover:bg-muted"
          >
            <Bell className="h-5 w-5" />

            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {unreadCount > 99
                  ? "99+"
                  : unreadCount}
              </span>
            )}
          </Link>

          <Link
            to={`/profile/${user?._id}`}
            className="flex items-center gap-3 rounded-xl border border-border p-1 pr-3 hover:bg-muted"
          >
            <img
              src={
                user?.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user?.name || "User"
                )}`
              }
              alt={user?.name}
              className="h-10 w-10 rounded-xl object-cover"
            />

            <div className="hidden text-left lg:block">
              <p className="text-sm font-semibold">
                {user?.name}
              </p>

              <p className="text-xs text-muted-foreground">
                @{user?.username}
              </p>
            </div>
          </Link>

          <button
            onClick={logout}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border hover:bg-red-500 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
          </button>

        </div>

      </div>
    </header>
  );
}