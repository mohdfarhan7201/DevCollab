import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-gray-200/20 bg-white/80 backdrop-blur-xl dark:bg-[#0B1120]/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-bold tracking-tight"
        >
          DevCollab
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/">Home</NavLink>

          <NavLink to="/projects">
            Projects
          </NavLink>

          <NavLink to="/search">
            Search
          </NavLink>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <button className="rounded-lg border px-4 py-2">
            Login
          </button>

          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;