import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  FolderKanban,
  Users,
  CalendarDays,
  MoreVertical,
} from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    id: 1,
    name: "DevCollab Platform",
    description:
      "Modern collaboration platform for developers with real-time features.",
    status: "In Progress",
    progress: 82,
    members: 8,
    dueDate: "18 Jul 2026",
  },
  {
    id: 2,
    name: "Portfolio Builder",
    description:
      "AI-powered portfolio builder for developers and designers.",
    status: "Planning",
    progress: 26,
    members: 4,
    dueDate: "28 Jul 2026",
  },
  {
    id: 3,
    name: "TaskFlow",
    description:
      "Advanced project management application with Kanban boards.",
    status: "Testing",
    progress: 94,
    members: 7,
    dueDate: "10 Jul 2026",
  },
  {
    id: 4,
    name: "Code Review Hub",
    description:
      "Collaborative code review platform with Git integration.",
    status: "Development",
    progress: 57,
    members: 6,
    dueDate: "02 Aug 2026",
  },
  {
    id: 5,
    name: "DevChat",
    description:
      "Real-time messaging platform built for software teams.",
    status: "In Progress",
    progress: 71,
    members: 5,
    dueDate: "24 Jul 2026",
  },
  {
    id: 6,
    name: "Issue Tracker",
    description:
      "Bug tracking system with sprint and milestone management.",
    status: "Completed",
    progress: 100,
    members: 3,
    dueDate: "05 Jul 2026",
  },
];

const statusColor = {
  Planning: "bg-yellow-500/15 text-yellow-500",
  Development: "bg-blue-500/15 text-blue-500",
  "In Progress": "bg-violet-500/15 text-violet-500",
  Testing: "bg-orange-500/15 text-orange-500",
  Completed: "bg-green-500/15 text-green-500",
};

export default function Projects() {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>

          <p className="mt-2 text-muted-foreground">
            Manage all your development projects from one place.
          </p>
        </div>

        <Link
          to="/dashboard/projects/new"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          New Project
        </Link>
      </div>

      {/* Toolbar */}

      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="text"
            placeholder="Search project..."
            className="h-11 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm outline-none focus:border-primary"
          />
        </div>

        <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm hover:bg-muted">
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      {/* Grid */}

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FolderKanban className="h-6 w-6" />
              </div>

              <button className="rounded-lg p-2 hover:bg-muted">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              {project.name}
            </h2>

            <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
              {project.description}
            </p>

            <span
              className={`mt-5 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusColor[project.status]}`}
            >
              {project.status}
            </span>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Progress
                </span>

                <span>{project.progress}%</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{
                    width: `${project.progress}%`,
                  }}
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border pt-5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                {project.members} Members
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                {project.dueDate}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}