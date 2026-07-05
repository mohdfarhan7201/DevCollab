import { Link } from "react-router-dom";
import { Bell, Search, Sun, Moon, Menu, Plus } from "lucide-react";
import { useTheme } from "next-themes";

export default function Topbar({ onMenuClick }) {
  const { theme, setTheme } = useTheme();

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
              placeholder="Search projects, teams..."
              className="h-11 w-80 rounded-xl border border-border bg-muted/40 pl-10 pr-4 text-sm outline-none transition focus:border-primary"
            />
          </div>
        </div>

        {/* Right */}

        <div className="flex items-center gap-3">
          <Link
            to="/dashboard/projects/new"
            className="hidden items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 md:flex"
          >
            <Plus className="h-4 w-4" />
            New Project
          </Link>

          <button
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border hover:bg-muted"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          <button className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border hover:bg-muted">
            <Bell className="h-5 w-5" />

            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
          </button>

          <button className="flex items-center gap-3 rounded-xl border border-border p-1 pr-3 hover:bg-muted">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="User"
              className="h-10 w-10 rounded-xl object-cover"
            />

            <div className="hidden text-left lg:block">
              <p className="text-sm font-semibold">Farhan Ali</p>
              <p className="text-xs text-muted-foreground">
                Full Stack Developer
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}