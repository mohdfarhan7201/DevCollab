import { motion } from "framer-motion";
import {
  GitBranch,
  GitPullRequest,
  CircleCheck,
  Users,
  Bell,
  Activity,
} from "lucide-react";

export default function HeroPreview() {
  return (
    <motion.div
      whileHover={{
        rotateX: 4,
        rotateY: -4,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 18,
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
      className="relative mx-auto w-full max-w-xl"
    >
      {/* Glass Card */}
      <div className="overflow-hidden rounded-3xl border border-border/60 bg-background/70 shadow-2xl backdrop-blur-xl">

        {/* Top Bar */}

        <div className="flex items-center justify-between border-b border-border/60 px-6 py-4">

          <div className="flex items-center gap-2">

            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />

          </div>

          <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            DevCollab
          </div>

          <Bell size={18} />
        </div>

        {/* Content */}

        <div className="space-y-6 p-6">

          {/* Repo */}

          <div className="rounded-2xl border border-border p-4">

            <div className="flex items-center justify-between">

              <div>

                <h3 className="font-semibold">
                  devcollab/frontend
                </h3>

                <p className="text-sm text-muted-foreground">
                  Production Branch
                </p>

              </div>

              <GitBranch className="text-primary" />

            </div>

          </div>

          {/* Stats */}

          <div className="grid grid-cols-3 gap-3">

            <StatCard
              icon={<Users size={18} />}
              value="124"
              label="Members"
            />

            <StatCard
              icon={<GitPullRequest size={18} />}
              value="39"
              label="PRs"
            />

            <StatCard
              icon={<CircleCheck size={18} />}
              value="92%"
              label="Merged"
            />

          </div>

          {/* Activity */}

          <div className="space-y-3">

            <ActivityItem
              color="bg-green-500"
              title="Authentication API merged"
            />

            <ActivityItem
              color="bg-blue-500"
              title="UI review completed"
            />

            <ActivityItem
              color="bg-violet-500"
              title="Deploy successful"
            />

            <ActivityItem
              color="bg-orange-500"
              title="New issue assigned"
            />

          </div>

          {/* Chart */}

          <div className="rounded-2xl border border-border p-5">

            <div className="mb-5 flex items-center gap-2">

              <Activity
                className="text-primary"
                size={18}
              />

              <span className="font-medium">
                Weekly Contributions
              </span>

            </div>

            <div className="flex h-28 items-end gap-2">

              {[35,60,42,82,75,95,70].map((h, i) => (

                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{
                    delay: i * .1,
                    duration: .6,
                  }}
                  className="flex-1 rounded-full bg-gradient-to-t from-primary to-blue-400"
                />

              ))}

            </div>

          </div>

        </div>
      </div>
    </motion.div>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="rounded-xl border border-border p-4">

      <div className="mb-3 text-primary">
        {icon}
      </div>

      <div className="text-xl font-bold">
        {value}
      </div>

      <div className="text-xs text-muted-foreground">
        {label}
      </div>

    </div>
  );
}

function ActivityItem({ color, title }) {
  return (
    <motion.div
      whileHover={{
        x: 6,
      }}
      className="flex items-center gap-3 rounded-xl border border-border px-4 py-3"
    >
      <div className={`h-3 w-3 rounded-full ${color}`} />

      <span className="text-sm">
        {title}
      </span>
    </motion.div>
  );
}