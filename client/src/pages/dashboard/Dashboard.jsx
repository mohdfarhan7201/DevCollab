import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  FolderKanban,
  Users,
  Activity,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const stats = [
  {
    title: "Total Projects",
    value: "12",
    change: "+18%",
    icon: FolderKanban,
  },
  {
    title: "Team Members",
    value: "38",
    change: "+6%",
    icon: Users,
  },
  {
    title: "Completed Tasks",
    value: "286",
    change: "+24%",
    icon: CheckCircle2,
  },
  {
    title: "Active Sprint",
    value: "09 Days",
    change: "Running",
    icon: Clock3,
  },
];

const recentProjects = [
  {
    id: 1,
    name: "DevCollab Platform",
    progress: 82,
    members: 8,
    status: "In Progress",
  },
  {
    id: 2,
    name: "Portfolio Builder",
    progress: 64,
    members: 5,
    status: "Development",
  },
  {
    id: 3,
    name: "TaskFlow",
    progress: 96,
    members: 7,
    status: "Testing",
  },
];

const recentActivity = [
  "Rahul pushed 12 commits.",
  "Farhan created a new project.",
  "Ankit completed Authentication Module.",
  "UI Team merged Pull Request #48.",
  "Meeting scheduled for tomorrow.",
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back 👋
          </h1>

          <p className="mt-2 text-muted-foreground">
            Here's what's happening across your workspace today.
          </p>
        </div>

        <Link
          to="/dashboard/projects/new"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Create Project
        </Link>
      </div>

      {/* Stats */}

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex items-start justify-between">
                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <Icon className="h-6 w-6" />
                </div>

                <span className="flex items-center gap-1 text-sm font-semibold text-green-500">
                  {item.change}
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              <h2 className="mt-6 text-3xl font-bold">{item.value}</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {item.title}
              </p>
            </motion.div>
          );
        })}
      </section>

      {/* Main Grid */}

      <section className="grid gap-6 xl:grid-cols-3">
        {/* Projects */}

        <div className="rounded-2xl border border-border bg-card xl:col-span-2">
          <div className="flex items-center justify-between border-b border-border p-6">
            <h2 className="text-lg font-semibold">Recent Projects</h2>

            <Link
              to="/dashboard/projects"
              className="text-sm font-medium text-primary hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="divide-y divide-border">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h3 className="font-semibold">{project.name}</h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {project.members} Members
                  </p>
                </div>

                <div className="w-full max-w-xs">
                  <div className="mb-2 flex justify-between text-sm">
                    <span>{project.status}</span>

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
              </div>
            ))}
          </div>
        </div>

        {/* Activity */}

        <div className="rounded-2xl border border-border bg-card">
          <div className="border-b border-border p-6">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />

              <h2 className="text-lg font-semibold">
                Recent Activity
              </h2>
            </div>
          </div>

          <div className="space-y-6 p-6">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3"
              >
                <div className="mt-2 h-2.5 w-2.5 rounded-full bg-primary" />

                <p className="text-sm text-muted-foreground">
                  {activity}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}