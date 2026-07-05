import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-background px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            Error 404
          </span>

          <h1 className="mt-8 text-7xl font-black tracking-tight md:text-9xl">
            404
          </h1>

          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            Page Not Found
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            The page you're looking for doesn't exist, has been moved,
            or the URL may be incorrect.
          </p>

          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
            >
              <Home className="h-5 w-5" />
              Go Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 font-semibold transition hover:bg-muted"
            >
              <ArrowLeft className="h-5 w-5" />
              Go Back
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-20 rounded-3xl border border-border bg-card p-8"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Search className="h-8 w-8" />
          </div>

          <h3 className="mt-6 text-xl font-semibold">
            Need something else?
          </h3>

          <p className="mt-3 text-muted-foreground">
            Try navigating from the homepage or access your workspace
            through the dashboard.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/dashboard"
              className="rounded-lg border border-border px-4 py-2 text-sm transition hover:bg-muted"
            >
              Dashboard
            </Link>

            <Link
              to="/dashboard/projects"
              className="rounded-lg border border-border px-4 py-2 text-sm transition hover:bg-muted"
            >
              Projects
            </Link>

            <Link
              to="/dashboard/teams"
              className="rounded-lg border border-border px-4 py-2 text-sm transition hover:bg-muted"
            >
              Teams
            </Link>

            <Link
              to="/dashboard/messages"
              className="rounded-lg border border-border px-4 py-2 text-sm transition hover:bg-muted"
            >
              Messages
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}