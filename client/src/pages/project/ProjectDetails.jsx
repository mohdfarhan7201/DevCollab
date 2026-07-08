import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Globe,
  Plus,
  Trash2,
  Calendar as CalendarIcon,
  User,
  Loader2,
  Edit2,
  X,
  Search,
  UserPlus,
  AlertCircle,
} from "lucide-react";
import { IoLogoGithub } from "react-icons/io";
import { getProjectById } from "../../api/project.api";
import {
  getProjectTasksApi,
  createTaskApi,
  updateTaskApi,
  moveTaskApi,
  deleteTaskApi,
} from "../../api/task.api";
import { searchUsers } from "../../api/user.api";
import { useAuth } from "../../context/AuthContext";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const { user: currentUser } = useAuth();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [error, setError] = useState(null);

  // Task creation/editing modal states
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskFormTitle, setTaskFormTitle] = useState("");
  const [taskFormDesc, setTaskFormDesc] = useState("");
  const [taskFormPriority, setTaskFormPriority] = useState("medium");
  const [taskFormStatus, setTaskFormStatus] = useState("todo");
  const [taskFormDueDate, setTaskFormDueDate] = useState("");
  const [selectedAssignee, setSelectedAssignee] = useState(null);

  // User search for assignee
  const [assigneeSearchQuery, setAssigneeSearchQuery] = useState("");
  const [assigneeSearchResults, setAssigneeSearchResults] = useState([]);
  const [searchingAssignee, setSearchingAssignee] = useState(false);

  const loadProjectAndTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const projData = await getProjectById(projectId);
      setProject(projData);

      setTasksLoading(true);
      const tasksData = await getProjectTasksApi(projectId);
      setTasks(tasksData || []);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || err.message || "Failed to load project details");
    } finally {
      setLoading(false);
      setTasksLoading(false);
    }
  };

  useEffect(() => {
    loadProjectAndTasks();
  }, [projectId]);

  // Drag & Drop Handlers
  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("text/plain", taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, columnStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    if (!taskId) return;

    // Optimistic update
    const previousTasks = [...tasks];
    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? { ...t, status: columnStatus } : t))
    );

    try {
      await moveTaskApi(taskId, columnStatus, 0);
    } catch (err) {
      console.error("Failed to move task:", err);
      // Revert if API fails
      setTasks(previousTasks);
      alert("Failed to update task status in backend.");
    }
  };

  // Open task form for creation
  const handleOpenCreateTask = (initialStatus = "todo") => {
    setEditingTask(null);
    setTaskFormTitle("");
    setTaskFormDesc("");
    setTaskFormPriority("medium");
    setTaskFormStatus(initialStatus);
    setTaskFormDueDate("");
    setSelectedAssignee(null);
    setAssigneeSearchQuery("");
    setAssigneeSearchResults([]);
    setShowTaskModal(true);
  };

  // Open task form for editing
  const handleOpenEditTask = (task) => {
    setEditingTask(task);
    setTaskFormTitle(task.title || "");
    setTaskFormDesc(task.description || "");
    setTaskFormPriority(task.priority || "medium");
    setTaskFormStatus(task.status || "todo");
    setTaskFormDueDate(
      task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : ""
    );
    setSelectedAssignee(task.assignee);
    setAssigneeSearchQuery("");
    setAssigneeSearchResults([]);
    setShowTaskModal(true);
  };

  // Handle Assignee search
  useEffect(() => {
    if (!assigneeSearchQuery.trim()) {
      setAssigneeSearchResults([]);
      return;
    }

    setSearchingAssignee(true);
    const timer = setTimeout(async () => {
      try {
        const users = await searchUsers(assigneeSearchQuery);
        setAssigneeSearchResults(users || []);
      } catch (err) {
        console.error(err);
      } finally {
        setSearchingAssignee(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [assigneeSearchQuery]);

  // Handle Task Submit
  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    if (!taskFormTitle.trim()) return;

    const payload = {
      title: taskFormTitle,
      description: taskFormDesc,
      priority: taskFormPriority,
      status: taskFormStatus,
      dueDate: taskFormDueDate || null,
      assignee: selectedAssignee ? selectedAssignee._id : null,
    };

    try {
      if (editingTask) {
        const updated = await updateTaskApi(editingTask._id, payload);
        setTasks((prev) => prev.map((t) => (t._id === editingTask._id ? updated : t)));
      } else {
        const created = await createTaskApi(projectId, payload);
        setTasks((prev) => [...prev, created]);
      }
      setShowTaskModal(false);
    } catch (err) {
      alert(err?.response?.data?.message || err.message || "Failed to save task");
    }
  };

  // Handle Task Delete
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await deleteTaskApi(taskId);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  // Grouping tasks by columns
  const getTasksByStatus = (status) => {
    return tasks.filter((t) => t.status === status);
  };

  const columns = [
    { id: "todo", title: "To Do", color: "border-t-4 border-t-gray-500", bg: "bg-gray-500/5" },
    { id: "in-progress", title: "In Progress", color: "border-t-4 border-t-blue-500", bg: "bg-blue-500/55" },
    { id: "review", title: "Review", color: "border-t-4 border-t-orange-500", bg: "bg-orange-500/55" },
    { id: "done", title: "Done", color: "border-t-4 border-t-green-500", bg: "bg-green-500/5" },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-40 space-y-4">
        <Loader2 className="h-10 w-10 text-violet-600 animate-spin" />
        <p className="text-muted-foreground text-sm font-medium">Loading project workplace...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="p-8 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-center max-w-lg mx-auto mt-20">
        <AlertCircle className="h-12 w-12 mx-auto mb-3" />
        <h2 className="text-lg font-bold">Workspace Error</h2>
        <p className="mt-1 text-sm">{error || "Project workspace not found."}</p>
        <Link to="/dashboard/projects" className="mt-4 inline-flex items-center gap-2 text-sm text-violet-600 font-semibold hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
      </div>
    );
  }

  // Priority color styling helper
  const getPriorityClasses = (prio) => {
    switch (prio) {
      case "urgent":
        return "bg-red-500/10 text-red-600 dark:text-red-400";
      case "high":
        return "bg-orange-500/10 text-orange-600 dark:text-orange-400";
      case "medium":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <div className="space-y-8 p-4">
      {/* Navigation */}
      <Link to="/dashboard/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
        <ArrowLeft className="h-4 w-4" /> Back to Projects
      </Link>

      {/* Hero Header Area */}
      <div className="relative rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-card p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start">
        {project.thumbnail?.url ? (
          <img
            src={project.thumbnail.url}
            alt={project.title}
            className="w-full md:w-56 h-40 object-cover rounded-2xl shadow-sm"
          />
        ) : (
          <div className="w-full md:w-56 h-40 bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white flex items-center justify-center font-bold text-3xl rounded-2xl shadow-sm">
            {project.title.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="flex-1 space-y-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-foreground">{project.title}</h1>
            <p className="text-sm text-muted-foreground">
              By <span className="font-semibold text-foreground">{project.owner?.name}</span> • Created on {new Date(project.createdAt).toLocaleDateString()}
            </p>
          </div>

          <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack */}
          {project.techStack?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-xs font-bold text-muted-foreground mr-1.5">Stack:</span>
              {project.techStack.map((tech) => (
                <span key={tech} className="text-xs bg-muted px-2.5 py-1 rounded-lg border border-border/50 text-foreground font-medium">
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Links */}
          <div className="flex gap-4 pt-1">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-violet-600 transition"
              >
                <IoLogoGithub className="h-4 w-4" /> GitHub Repository
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-violet-600 transition"
              >
                <Globe className="h-4 w-4" /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Kanban Board section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Kanban Workspace</h2>
          <p className="text-sm text-muted-foreground">Drag and drop cards block-by-block to update progress statuses.</p>
        </div>

        <button
          onClick={() => handleOpenCreateTask("todo")}
          className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 text-sm font-semibold transition active:scale-95 duration-200 shadow-md shadow-violet-600/10"
        >
          <Plus className="h-4 w-4" /> Add task
        </button>
      </div>

      {/* Kanban Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 items-start">
        {columns.map((col) => {
          const colTasks = getTasksByStatus(col.id);

          return (
            <div
              key={col.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, col.id)}
              className={`rounded-2xl border border-gray-200 dark:border-gray-800 bg-card/60 p-4 min-h-[500px] flex flex-col justify-start relative transition-all duration-300 ${col.color}`}
            >
              {/* Column Title */}
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-sm text-foreground uppercase tracking-wider">{col.title}</span>
                <span className="h-6 min-w-6 px-1.5 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                  {colTasks.length}
                </span>
              </div>

              {/* Add Task Trigger */}
              <button
                onClick={() => handleOpenCreateTask(col.id)}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-gray-300 dark:border-gray-800 py-2.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition mb-3"
              >
                <Plus className="h-3.5 w-3.5" /> add card
              </button>

              {/* Column Cards Container */}
              <div className="space-y-3 overflow-y-auto max-h-[600px] flex-1">
                {tasksLoading ? (
                  <div className="flex py-6 justify-center">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                ) : colTasks.length > 0 ? (
                  colTasks.map((task) => (
                    <motion.div
                      key={task._id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task._id)}
                      className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-background shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing transition"
                    >
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${getPriorityClasses(task.priority)}`}>
                          {task.priority}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenEditTask(task)}
                            className="p-1 hover:bg-muted text-muted-foreground hover:text-violet-600 rounded transition"
                          >
                            <Edit2 className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task._id)}
                            className="p-1 hover:bg-muted text-muted-foreground hover:text-red-500 rounded transition"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      <h3 className="font-semibold text-sm text-foreground mb-1 line-clamp-2 leading-snug">
                        {task.title}
                      </h3>

                      {task.description && (
                        <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                          {task.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800/80">
                        {/* Assignee */}
                        <div className="flex items-center gap-1.5">
                          {task.assignee ? (
                            <>
                              <img
                                src={task.assignee.avatar?.url || `https://ui-avatars.com/api/?name=${encodeURIComponent(task.assignee.name)}`}
                                alt={task.assignee.name}
                                title={`Assigned to ${task.assignee.name}`}
                                className="h-5 w-5 rounded-full object-cover"
                              />
                              <span className="text-[10px] text-muted-foreground truncate max-w-[80px]">
                                {task.assignee.name}
                              </span>
                            </>
                          ) : (
                            <span className="text-[10px] text-muted-foreground italic">Unassigned</span>
                          )}
                        </div>

                        {/* Due Date */}
                        {task.dueDate && (
                          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                            <CalendarIcon className="h-3 w-3 text-violet-500" />
                            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-xs text-muted-foreground p-8">No tasks here.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Creation / Editing Modal */}
      <AnimatePresence>
        {showTaskModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg rounded-2xl border border-gray-200 dark:border-gray-800 bg-card p-6 shadow-2xl"
            >
              <button
                onClick={() => setShowTaskModal(false)}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:bg-muted rounded-xl transition"
              >
                <X className="h-5 w-5" />
              </button>

              <h2 className="text-2xl font-bold mb-4">
                {editingTask ? "Edit Kanban Task" : "Create New Task"}
              </h2>

              <form onSubmit={handleTaskSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1 text-foreground">Task Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Implement refresh flow"
                    value={taskFormTitle}
                    onChange={(e) => setTaskFormTitle(e.target.value)}
                    className="w-full h-11 rounded-xl border border-gray-200 dark:border-gray-800 bg-background px-4 text-sm outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1 text-foreground">Description</label>
                  <textarea
                    placeholder="Describe this task details..."
                    rows="3"
                    value={taskFormDesc}
                    onChange={(e) => setTaskFormDesc(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-background p-4 text-sm outline-none focus:border-violet-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-foreground">Status</label>
                    <select
                      value={taskFormStatus}
                      onChange={(e) => setTaskFormStatus(e.target.value)}
                      className="w-full h-11 rounded-xl border border-gray-200 dark:border-gray-800 bg-background px-3 text-sm outline-none focus:border-violet-500"
                    >
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="review">Review</option>
                      <option value="done">Done</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1 text-foreground">Priority</label>
                    <select
                      value={taskFormPriority}
                      onChange={(e) => setTaskFormPriority(e.target.value)}
                      className="w-full h-11 rounded-xl border border-gray-200 dark:border-gray-800 bg-background px-3 text-sm outline-none focus:border-violet-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1 text-foreground">Due Date</label>
                  <input
                    type="date"
                    value={taskFormDueDate}
                    onChange={(e) => setTaskFormDueDate(e.target.value)}
                    className="w-full h-11 rounded-xl border border-gray-200 dark:border-gray-800 bg-background px-4 text-sm outline-none"
                  />
                </div>

                {/* Assignee Selector with Input Search */}
                <div>
                  <label className="block text-sm font-semibold mb-1 text-foreground">Assignee</label>

                  {selectedAssignee ? (
                    <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-800 rounded-xl bg-muted/30">
                      <div className="flex items-center gap-3">
                        <img
                          src={selectedAssignee.avatar?.url || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedAssignee.name)}`}
                          alt=""
                          className="h-8 w-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-sm">{selectedAssignee.name}</p>
                          <p className="text-xs text-muted-foreground">@{selectedAssignee.username}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedAssignee(null)}
                        className="text-muted-foreground hover:text-red-500 p-1 hover:bg-muted rounded"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="text"
                          value={assigneeSearchQuery}
                          onChange={(e) => setAssigneeSearchQuery(e.target.value)}
                          placeholder="Type username to assign member..."
                          className="w-full h-11 rounded-xl border border-gray-200 dark:border-gray-800 bg-background pl-10 pr-4 text-sm outline-none focus:border-violet-500"
                        />
                        {searchingAssignee && (
                          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                        )}
                      </div>

                      {/* Dropdown Results */}
                      {assigneeSearchResults.length > 0 && (
                        <div className="border border-gray-200 dark:border-gray-800 bg-card rounded-xl shadow-lg max-h-40 overflow-y-auto divide-y divide-border/50">
                          {assigneeSearchResults.map((user) => (
                            <button
                              key={user._id}
                              type="button"
                              onClick={() => {
                                setSelectedAssignee(user);
                                setAssigneeSearchResults([]);
                                setAssigneeSearchQuery("");
                              }}
                              className="w-full flex items-center gap-3 p-2.5 text-left hover:bg-muted transition"
                            >
                              <img
                                src={user.avatar?.url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
                                alt=""
                                className="h-7 w-7 rounded-full object-cover"
                              />
                              <div>
                                <p className="font-semibold text-xs text-foreground">{user.name}</p>
                                <p className="text-[10px] text-muted-foreground">@{user.username}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center items-center h-11 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition shadow-md shadow-violet-600/10 active:scale-95 duration-200"
                  >
                    Save Task
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}