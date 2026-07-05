import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  MessageSquare,
  CalendarDays,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import { IoLogoGithub } from "react-icons/io";

const navigation = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Projects",
    icon: FolderKanban,
    path: "/dashboard/projects",
  },
  {
    title: "Teams",
    icon: Users,
    path: "/dashboard/teams",
  },
  {
    title: "Messages",
    icon: MessageSquare,
    path: "/dashboard/messages",
  },
  {
    title: "Calendar",
    icon: CalendarDays,
    path: "/dashboard/calendar",
  },
  {
    title: "Notifications",
    icon: Bell,
    path: "/dashboard/notifications",
  },
];

const bottomNavigation = [
  {
    title: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
  },
];

function SidebarLink({ item, collapsed }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      end={item.path === "/dashboard"}
      className={({ isActive }) =>
        clsx(
          "group relative flex items-center rounded-xl transition-all duration-200",
          collapsed ? "justify-center p-3" : "gap-3 px-4 py-3",
          isActive
            ? "bg-primary text-primary-foreground shadow-lg"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon className="h-5 w-5 shrink-0" />

          {!collapsed && (
            <span className="text-sm font-medium">{item.title}</span>
          )}

          {isActive && (
            <motion.div
              layoutId="sidebar-active"
              className="absolute inset-0 -z-10 rounded-xl"
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 30,
              }}
            />
          )}
        </>
      )}
    </NavLink>
  );
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={clsx(
        "sticky top-0 hidden h-screen border-r border-border bg-background lg:flex lg:flex-col",
        collapsed ? "w-24" : "w-72"
      )}
    >
      {/* Logo */}

      <div
        className={clsx(
          "flex h-20 items-center border-b border-border",
          collapsed ? "justify-center" : "justify-between px-6"
        )}
      >
        {!collapsed && (
          <NavLink
            to="/"
            className="flex items-center gap-3 font-bold tracking-tight"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
              <IoLogoGithub className="h-6 w-6" />
            </div>

            <div className="leading-tight">
              <p className="text-lg">DevCollab</p>
              <p className="text-xs font-medium text-muted-foreground">
                Team Workspace
              </p>
            </div>
          </NavLink>
        )}

        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className={clsx(
            "rounded-xl border border-border p-2 transition hover:bg-muted",
            collapsed && "absolute right-3 top-6"
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation */}

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <nav className="space-y-2">
          {navigation.map((item) => (
            <SidebarLink
              key={item.path}
              item={item}
              collapsed={collapsed}
            />
          ))}
        </nav>
      </div>

      {/* Bottom */}

      <div className="border-t border-border p-4">
        <div className="space-y-2">
          {bottomNavigation.map((item) => (
            <SidebarLink
              key={item.path}
              item={item}
              collapsed={collapsed}
            />
          ))}

          <button
            className={clsx(
              "flex w-full items-center rounded-xl text-red-500 transition hover:bg-red-500/10",
              collapsed ? "justify-center p-3" : "gap-3 px-4 py-3"
            )}
          >
            <LogOut className="h-5 w-5" />

            {!collapsed && (
              <span className="text-sm font-medium">Logout</span>
            )}
          </button>
        </div>

        {!collapsed && (
          <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-4">
            <p className="text-sm font-semibold">DevCollab Pro</p>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Collaborate faster with unlimited projects, private workspaces,
              advanced analytics and priority support.
            </p>

            <button className="mt-4 w-full rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
              Upgrade
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}