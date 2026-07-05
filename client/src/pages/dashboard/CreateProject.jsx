import { useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  FolderKanban,
  Plus,
  Save,
  Users,
} from "lucide-react";

const priorities = ["Low", "Medium", "High", "Critical"];

const statuses = [
  "Planning",
  "In Progress",
  "Development",
  "Testing",
];

export default function CreateProject() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "Planning",
    priority: "Medium",
    team: "",
    dueDate: "",
    repository: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Header */}

      <div>
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <FolderKanban className="h-8 w-8" />
        </div>

        <h1 className="text-3xl font-bold">Create Project</h1>

        <p className="mt-2 text-muted-foreground">
          Create a new project and start collaborating with your team.
        </p>
      </div>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-border bg-card p-8"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {/* Project Name */}

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
              Project Name
            </label>

            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="DevCollab"
              className="h-12 w-full rounded-xl border border-border bg-background px-4 outline-none transition focus:border-primary"
            />
          </div>

          {/* Description */}

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              required
              rows={6}
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your project..."
              className="w-full rounded-xl border border-border bg-background p-4 outline-none transition focus:border-primary"
            />
          </div>

          {/* Status */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Status
            </label>

            <div className="relative">
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="h-12 w-full appearance-none rounded-xl border border-border bg-background px-4 outline-none focus:border-primary"
              >
                {statuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>

              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2" />
            </div>
          </div>

          {/* Priority */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Priority
            </label>

            <div className="relative">
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="h-12 w-full appearance-none rounded-xl border border-border bg-background px-4 outline-none focus:border-primary"
              >
                {priorities.map((priority) => (
                  <option key={priority}>{priority}</option>
                ))}
              </select>

              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2" />
            </div>
          </div>

          {/* Team */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Team Name
            </label>

            <div className="relative">
              <Users className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <input
                name="team"
                value={form.team}
                onChange={handleChange}
                placeholder="Frontend Team"
                className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Due Date */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Due Date
            </label>

            <div className="relative">
              <CalendarDays className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Repository */}

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
              Git Repository
            </label>

            <input
              name="repository"
              value={form.repository}
              onChange={handleChange}
              placeholder="https://github.com/username/project"
              className="h-12 w-full rounded-xl border border-border bg-background px-4 outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Actions */}

        <div className="mt-10 flex flex-col-reverse gap-4 border-t border-border pt-8 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="rounded-xl border border-border px-6 py-3 font-medium transition hover:bg-muted"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
          >
            <Save className="h-4 w-4" />
            Save Project
          </button>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 font-medium transition hover:bg-muted"
          >
            <Plus className="h-4 w-4" />
            Save & Add Another
          </button>
        </div>
      </form>
    </div>
  );
}