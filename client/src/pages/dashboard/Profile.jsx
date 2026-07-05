import {
  MapPin,
  Mail,
  Globe,
  CalendarDays,
  Briefcase,
  Award,
  Edit,
  Users,
  FolderKanban,
  CheckCircle2,
} from "lucide-react";
import { IoLogoGithub , IoLogoLinkedin } from "react-icons/io";

const skills = [
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "TypeScript",
  "Tailwind CSS",
  "Docker",
  "Redis",
  "Socket.io",
];

const projects = [
  {
    name: "DevCollab",
    role: "Full Stack Developer",
    status: "In Progress",
  },
  {
    name: "TaskFlow",
    role: "Backend Developer",
    status: "Completed",
  },
  {
    name: "Portfolio Builder",
    role: "Frontend Developer",
    status: "Planning",
  },
];

export default function Profile() {
  return (
    <div className="space-y-8">
      {/* Cover */}

      <section className="overflow-hidden rounded-3xl border border-border bg-card">
        <div className="h-52 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500" />

        <div className="relative px-8 pb-8">
          <div className="-mt-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
              <img
                src="https://i.pravatar.cc/250?img=12"
                alt="Profile"
                className="h-32 w-32 rounded-3xl border-4 border-background object-cover shadow-xl"
              />

              <div>
                <h1 className="text-3xl font-bold">
                  Farhan Ali
                </h1>

                <p className="mt-2 text-muted-foreground">
                  Full Stack MERN Developer
                </p>

                <div className="mt-4 flex flex-wrap gap-5 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    India
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    farhan@example.com
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    Joined July 2026
                  </div>
                </div>
              </div>
            </div>

            <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
              <Edit className="h-4 w-4" />
              Edit Profile
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6">
          <Users className="mb-4 h-8 w-8 text-primary" />

          <h2 className="text-3xl font-bold">38</h2>

          <p className="mt-2 text-muted-foreground">
            Team Members
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <FolderKanban className="mb-4 h-8 w-8 text-primary" />

          <h2 className="text-3xl font-bold">12</h2>

          <p className="mt-2 text-muted-foreground">
            Projects
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <CheckCircle2 className="mb-4 h-8 w-8 text-primary" />

          <h2 className="text-3xl font-bold">286</h2>

          <p className="mt-2 text-muted-foreground">
            Completed Tasks
          </p>
        </div>
      </section>

      {/* Main */}

      <div className="grid gap-8 xl:grid-cols-[1fr_340px]">
        {/* Left */}

        <div className="space-y-8">
          <section className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-xl font-semibold">
              About
            </h2>

            <p className="mt-4 leading-8 text-muted-foreground">
              Passionate Full Stack MERN Developer focused on
              building scalable web applications, real-time
              collaboration tools and modern user experiences.
              Experienced with React, Node.js, MongoDB,
              Socket.io and cloud deployment.
            </p>
          </section>

          <section className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-xl font-semibold">
              Current Projects
            </h2>

            <div className="mt-6 space-y-5">
              {projects.map((project) => (
                <div
                  key={project.name}
                  className="flex items-center justify-between rounded-xl border border-border p-5"
                >
                  <div>
                    <h3 className="font-semibold">
                      {project.name}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {project.role}
                    </p>
                  </div>

                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                    {project.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right */}

        <div className="space-y-8">
          <section className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-xl font-semibold">
              Skills
            </h2>

            <div className="mt-6 flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-xl font-semibold">
              Links
            </h2>

            <div className="mt-6 space-y-4">
              <a
                href="#"
                className="flex items-center gap-3 rounded-xl border border-border p-4 hover:bg-muted"
              >
                <IoLogoGithub className="h-5 w-5" />
                GitHub
              </a>

              <a
                href="#"
                className="flex items-center gap-3 rounded-xl border border-border p-4 hover:bg-muted"
              >
                <IoLogoLinkedin className="h-5 w-5" />
                LinkedIn
              </a>

              <a
                href="#"
                className="flex items-center gap-3 rounded-xl border border-border p-4 hover:bg-muted"
              >
                <Globe className="h-5 w-5" />
                Portfolio
              </a>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-8">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Award className="h-5 w-5 text-primary" />
              Experience
            </h2>

            <div className="mt-6 flex items-start gap-4">
              <Briefcase className="mt-1 h-5 w-5 text-primary" />

              <div>
                <h3 className="font-semibold">
                  Full Stack Developer
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Building scalable MERN applications, REST APIs,
                  authentication systems and collaborative
                  platforms.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}