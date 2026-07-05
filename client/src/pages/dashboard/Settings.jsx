import { useState } from "react";
import { useTheme } from "next-themes";
import {
  User,
  Lock,
  Bell,
  Palette,
  Shield,
  Globe,
  Moon,
  Sun,
  Camera,
  Save,
} from "lucide-react";

export default function Settings() {
  const { theme, setTheme } = useTheme();

  const [form, setForm] = useState({
    name: "Farhan Ali",
    email: "farhan@example.com",
    username: "farhanali",
    bio: "Full Stack MERN Developer.",
    website: "https://portfolio.dev",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">Settings</h1>

        <p className="mt-2 text-muted-foreground">
          Manage your account preferences and workspace settings.
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[260px_1fr]">
        {/* Sidebar */}

        <aside className="rounded-2xl border border-border bg-card p-5">
          <nav className="space-y-2">
            <button className="flex w-full items-center gap-3 rounded-xl bg-primary px-4 py-3 text-left text-primary-foreground">
              <User className="h-5 w-5" />
              Profile
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 hover:bg-muted">
              <Lock className="h-5 w-5" />
              Security
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 hover:bg-muted">
              <Bell className="h-5 w-5" />
              Notifications
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 hover:bg-muted">
              <Palette className="h-5 w-5" />
              Appearance
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 hover:bg-muted">
              <Shield className="h-5 w-5" />
              Privacy
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 hover:bg-muted">
              <Globe className="h-5 w-5" />
              Workspace
            </button>
          </nav>
        </aside>

        {/* Content */}

        <div className="space-y-8">
          {/* Profile */}

          <section className="rounded-2xl border border-border bg-card p-8">
            <div className="flex flex-col items-center gap-6 border-b border-border pb-8 md:flex-row">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/200?img=12"
                  alt="Profile"
                  className="h-28 w-28 rounded-full object-cover"
                />

                <button className="absolute bottom-1 right-1 rounded-full bg-primary p-2 text-primary-foreground shadow-lg">
                  <Camera className="h-4 w-4" />
                </button>
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  {form.name}
                </h2>

                <p className="text-muted-foreground">
                  Full Stack Developer
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Full Name
                </label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="h-11 w-full rounded-xl border border-border bg-background px-4 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Username
                </label>

                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className="h-11 w-full rounded-xl border border-border bg-background px-4 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Email
                </label>

                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="h-11 w-full rounded-xl border border-border bg-background px-4 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Website
                </label>

                <input
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  className="h-11 w-full rounded-xl border border-border bg-background px-4 outline-none focus:border-primary"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium">
                  Bio
                </label>

                <textarea
                  rows={5}
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-border bg-background p-4 outline-none focus:border-primary"
                />
              </div>
            </div>
          </section>

          {/* Appearance */}

          <section className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-xl font-semibold">
              Appearance
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Customize how DevCollab looks.
            </p>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => setTheme("light")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl border p-5 transition ${
                  theme === "light"
                    ? "border-primary bg-primary/10"
                    : "border-border"
                }`}
              >
                <Sun className="h-5 w-5" />
                Light
              </button>

              <button
                onClick={() => setTheme("dark")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl border p-5 transition ${
                  theme === "dark"
                    ? "border-primary bg-primary/10"
                    : "border-border"
                }`}
              >
                <Moon className="h-5 w-5" />
                Dark
              </button>
            </div>
          </section>

          {/* Save */}

          <div className="flex justify-end">
            <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90">
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}