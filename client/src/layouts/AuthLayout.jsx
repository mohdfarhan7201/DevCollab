import { Outlet, Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { IoLogoGithub } from "react-icons/io";


export default function AuthLayout() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background */}

      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      {/* Header */}

      <header className="relative z-10 border-b border-border/60 backdrop-blur">
        <div className="container-section flex h-16 items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <IoLogoGithub className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-lg font-bold">
                DevCollab
              </h1>

              <p className="text-xs text-muted-foreground">
                Collaborate Better
              </p>
            </div>
          </Link>

          <button
            onClick={() =>
              setTheme(
                resolvedTheme === "dark"
                  ? "light"
                  : "dark"
              )
            }
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card transition hover:bg-muted"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>

      {/* Main */}

      <main className="relative z-10 flex min-h-[calc(100vh-64px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
    </div>
  );
}