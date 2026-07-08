import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FolderKanban,
  Users,
  CheckCircle2,
  Activity,
  Plus,
  ArrowRight,
  Eye,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { getProjects } from "../../api/project.api";
import { getAllUsers } from "../../api/user.api";
import { getFeedApi } from "../../api/post.api";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  const [projectsCount, setProjectsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch projects
      const projectsRes = await getProjects({ limit: 5 });
      const projectsList = projectsRes.projects || projectsRes || [];
      setRecentProjects(projectsList.slice(0, 3));
      setProjectsCount(projectsList.length || 0);

      // Fetch users
      try {
        const usersRes = await getAllUsers(1, 100);
        setUsersCount(usersRes.totalUsers || usersRes.users?.length || usersRes.length || 0);
      } catch (err) {
        console.error("Failed to fetch users for dashboard count:", err);
      }

      // Fetch social feeds for active logs
      try {
        const postsRes = await getFeedApi(1, 6);
        const postsList = postsRes.posts || postsRes || [];
        setPostsCount(postsList.length || 0);

        // Turn posts into recent activities
        const formattedActivities = postsList.slice(0, 5).map((post) => {
          return {
            user: post.author?.name || "Someone",
            action: "published a new post:",
            detail: post.content ? `"${post.content.slice(0, 45)}..."` : "a post",
            time: new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
        });

        setRecentActivities(formattedActivities);
      } catch (err) {
        console.error("Failed to fetch social feeds for dashboard:", err);
      }

    } catch (error) {
      console.error("Failed to load dashboard statistics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const stats = [
    {
      title: "Active Projects",
      value: loading ? "..." : projectsCount,
      change: "Real Time",
      icon: FolderKanban,
      color: "text-violet-500 bg-violet-500/10",
    },
    {
      title: "Workspace Co-workers",
      value: loading ? "..." : usersCount,
      change: "+ Active",
      icon: Users,
      color: "text-sky-500 bg-sky-500/10",
    },
    {
      title: "Feed Social Posts",
      value: loading ? "..." : postsCount,
      change: "Discussion",
      icon: MessageSquare,
      color: "text-pink-500 bg-pink-500/10",
    },
    {
      title: "Collaborator Status",
      value: "DevCollab v1",
      change: "Connected",
      icon: Sparkles,
      color: "text-amber-500 bg-amber-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-violet-500 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent">
            Welcome back, {user?.name || "Developer"} 👋
          </h1>
          <p className="mt-2 text-muted-foreground">
            Here's what's happening across your workspace today. All systems are fully connected.
          </p>
        </div>

        <Link
          to="/dashboard/projects"
          className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 text-sm font-semibold transition shadow-md shadow-violet-600/20 active:scale-95 duration-200"
        >
          <Plus className="h-4 w-4" />
          Create Project
        </Link>
      </div>

      {/* Stats Counter Section */}
      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className={`rounded-xl p-3 ${item.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-semibold text-green-500 bg-green-500/10 px-2 py-0.5 rounded">
                  {item.change}
                </span>
              </div>
              <h2 className="mt-6 text-3xl font-bold text-foreground">{item.value}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{item.title}</p>
            </motion.div>
          );
        })}
      </section>

      {/* Main Grid */}
      <section className="grid gap-6 xl:grid-cols-3">
        {/* Recent Projects List */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-card xl:col-span-2 shadow-sm flex flex-col justify-between overflow-hidden">
          <div>
            <div className="flex items-center justify-between border-b border-gray-150 dark:border-gray-800 p-6">
              <h2 className="text-lg font-bold text-foreground">Recent Projects</h2>
              <Link
                to="/dashboard/projects"
                className="text-xs font-semibold text-violet-600 hover:text-violet-700 inline-flex items-center gap-1 hover:underline"
              >
                View All <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="divide-y divide-gray-150 dark:divide-gray-800">
              {loading ? (
                <p className="p-6 text-sm text-muted-foreground">Loading recent workspace...</p>
              ) : recentProjects.length > 0 ? (
                recentProjects.map((project) => (
                  <div
                    key={project._id}
                    className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between hover:bg-muted/30 transition-colors"
                  >
                    <div className="space-y-1">
                      <Link to={`/projects/${project._id}`} className="font-semibold text-foreground hover:text-violet-600 transition">
                        {project.title}
                      </Link>
                      <p className="text-xs text-muted-foreground max-w-sm line-clamp-1">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      {project.techStack?.length > 0 && (
                        <div className="hidden sm:flex gap-1">
                          {project.techStack.slice(0, 3).map((item) => (
                            <span key={item} className="text-[10px] bg-muted px-2 py-0.5 rounded text-muted-foreground border border-border/40 font-medium">
                              {item}
                            </span>
                          ))}
                        </div>
                      )}

                      <Link
                        to={`/projects/${project._id}`}
                        className="p-2 hover:bg-muted rounded-xl transition text-violet-600 hover:text-violet-700"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center">
                  <FolderKanban className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-semibold text-muted-foreground">No projects found.</p>
                  <Link to="/dashboard/projects" className="text-xs text-violet-600 hover:underline mt-1 inline-block">
                    Create the first project
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Activity Logs */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-card shadow-sm overflow-hidden flex flex-col">
          <div className="border-b border-gray-150 dark:border-gray-800 p-6 flex items-center gap-2">
            <Activity className="h-5 w-5 text-violet-500" />
            <h2 className="text-lg font-bold text-foreground">Recent Feeds</h2>
          </div>

          <div className="space-y-5 p-6 flex-1">
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading actions...</p>
            ) : recentActivities.length > 0 ? (
              recentActivities.map((act, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-violet-600 flex-shrink-0" />
                  <div className="space-y-0.5">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-bold text-foreground">{act.user}</span> {act.action}
                    </p>
                    <p className="text-xs text-foreground/80 font-medium">{act.detail}</p>
                    <span className="text-[10px] text-muted-foreground/60 block">{act.time}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground text-center py-10">No recent public activity.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}