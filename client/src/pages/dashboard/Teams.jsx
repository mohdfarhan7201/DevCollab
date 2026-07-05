import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Users,
  FolderKanban,
  Crown,
  MoreVertical,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";

const teams = [
  {
    id: 1,
    name: "Frontend Team",
    lead: "Farhan Ali",
    members: 8,
    projects: 4,
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    id: 2,
    name: "Backend Team",
    lead: "Rahul Sharma",
    members: 6,
    projects: 3,
    color: "from-sky-500 to-cyan-500",
  },
  {
    id: 3,
    name: "UI/UX Team",
    lead: "Anjali Verma",
    members: 5,
    projects: 2,
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 4,
    name: "DevOps Team",
    lead: "Mohit Singh",
    members: 4,
    projects: 2,
    color: "from-emerald-500 to-green-500",
  },
  {
    id: 5,
    name: "QA Team",
    lead: "Aman Patel",
    members: 5,
    projects: 5,
    color: "from-orange-500 to-amber-500",
  },
  {
    id: 6,
    name: "Mobile Team",
    lead: "Sneha Gupta",
    members: 7,
    projects: 3,
    color: "from-indigo-500 to-blue-500",
  },
];

export default function Teams() {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Teams</h1>

          <p className="mt-2 text-muted-foreground">
            Manage your teams, members and project assignments.
          </p>
        </div>

        <Link
          to="/dashboard/teams/new"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Create Team
        </Link>
      </div>

      {/* Search */}

      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="text"
            placeholder="Search team..."
            className="h-11 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Teams */}

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {teams.map((team, index) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className="rounded-2xl border border-border bg-card"
          >
            <div
              className={`h-28 rounded-t-2xl bg-gradient-to-r ${team.color}`}
            />

            <div className="relative p-6">
              <div className="absolute -top-8 flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-background bg-background shadow-lg">
                <Users className="h-8 w-8 text-primary" />
              </div>

              <div className="flex justify-end">
                <button className="rounded-lg p-2 hover:bg-muted">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>

              <h2 className="mt-4 text-xl font-semibold">
                {team.name}
              </h2>

              <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
                <Crown className="h-4 w-4 text-yellow-500" />
                {team.lead}
              </div>

              <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                {team.lead.toLowerCase().replace(/\s/g, ".")}@devcollab.com
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-muted/50 p-4 text-center">
                  <Users className="mx-auto mb-2 h-5 w-5 text-primary" />

                  <p className="text-xl font-bold">
                    {team.members}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Members
                  </p>
                </div>

                <div className="rounded-xl bg-muted/50 p-4 text-center">
                  <FolderKanban className="mx-auto mb-2 h-5 w-5 text-primary" />

                  <p className="text-xl font-bold">
                    {team.projects}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Projects
                  </p>
                </div>
              </div>

              <button className="mt-6 w-full rounded-xl border border-border py-3 text-sm font-medium transition hover:bg-muted">
                View Team
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}