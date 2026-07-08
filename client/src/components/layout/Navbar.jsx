import { NavLink } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle";
import { useAuth } from "../../context/AuthContext";

const navLinkClass = ({ isActive }) =>
  `transition-colors duration-200 ${
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white"
  }`;

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-gray-200/20 bg-white/80 backdrop-blur-xl dark:bg-[#0B1120]/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <NavLink
          to={isAuthenticated ? "/dashboard" : "/"}
          className="text-2xl font-bold"
        >
          DevCollab
        </NavLink>

        {/* Navigation */}

        <nav className="hidden md:flex items-center gap-8">

          <NavLink
            to="/"
            className={navLinkClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/projects"
            className={navLinkClass}
          >
            Projects
          </NavLink>

          <NavLink
            to="/search"
            className={navLinkClass}
          >
            Search
          </NavLink>

          {isAuthenticated && (
            <>
              <NavLink
                to="/feed"
                className={navLinkClass}
              >
                Feed
              </NavLink>

              <NavLink
                to="/messages"
                className={navLinkClass}
              >
                Messages
              </NavLink>

              <NavLink
                to="/dashboard"
                className={navLinkClass}
              >
                Dashboard
              </NavLink>
            </>
          )}

        </nav>

        {/* Right Side */}

        <div className="flex items-center gap-3">

          <ThemeToggle />

          {!isAuthenticated ? (
            <>
              <NavLink
                to="/login"
                className="rounded-lg border px-4 py-2 transition hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to={`/profile/${user?._id}`}
                className="flex items-center gap-2"
              >
                <img
                  src={
                    user?.avatar ||
                    "https://ui-avatars.com/api/?name=User"
                  }
                  alt="avatar"
                  className="h-10 w-10 rounded-full object-cover border"
                />

                <span className="hidden md:block font-medium">
                  {user?.name}
                </span>
              </NavLink>

              <button
                onClick={logout}
                className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>
    </header>
  );
};

export default Navbar;