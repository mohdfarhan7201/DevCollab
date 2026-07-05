import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock3,
  Users,
  MapPin,
} from "lucide-react";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const days = [
  null,
  null,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
];

const events = [
  {
    id: 1,
    title: "Sprint Planning",
    time: "09:00 AM - 10:30 AM",
    team: "Frontend Team",
    location: "Google Meet",
    color: "bg-violet-500",
  },
  {
    id: 2,
    title: "Backend API Review",
    time: "12:00 PM - 01:00 PM",
    team: "Backend Team",
    location: "Conference Room",
    color: "bg-sky-500",
  },
  {
    id: 3,
    title: "UI Design Discussion",
    time: "03:30 PM - 04:30 PM",
    team: "UI/UX Team",
    location: "Figma",
    color: "bg-pink-500",
  },
  {
    id: 4,
    title: "Project Demo",
    time: "06:00 PM - 07:00 PM",
    team: "All Teams",
    location: "Zoom",
    color: "bg-emerald-500",
  },
];

export default function Calendar() {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Calendar</h1>

          <p className="mt-2 text-muted-foreground">
            Manage meetings, sprint planning and project schedules.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
          <Plus className="h-4 w-4" />
          Add Event
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        {/* Calendar */}

        <div className="rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border p-6">
            <div>
              <h2 className="text-xl font-semibold">July 2026</h2>

              <p className="text-sm text-muted-foreground">
                Monthly Overview
              </p>
            </div>

            <div className="flex gap-2">
              <button className="rounded-xl border border-border p-2 hover:bg-muted">
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button className="rounded-xl border border-border p-2 hover:bg-muted">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 border-b border-border">
            {weekDays.map((day) => (
              <div
                key={day}
                className="border-r border-border py-4 text-center text-sm font-semibold last:border-r-0"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {days.map((day, index) => (
              <div
                key={index}
                className="aspect-square border-b border-r border-border p-3 last:border-r-0 hover:bg-muted/40"
              >
                {day && (
                  <>
                    <span
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                        day === 15
                          ? "bg-primary text-primary-foreground"
                          : ""
                      }`}
                    >
                      {day}
                    </span>

                    {(day === 4 ||
                      day === 10 ||
                      day === 15 ||
                      day === 23) && (
                      <div className="mt-3 space-y-1">
                        <div className="h-2 rounded-full bg-primary" />
                        <div className="h-2 rounded-full bg-violet-500" />
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Events */}

        <div className="rounded-2xl border border-border bg-card">
          <div className="border-b border-border p-6">
            <h2 className="text-xl font-semibold">
              Today's Schedule
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              4 upcoming events
            </p>
          </div>

          <div className="space-y-5 p-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="rounded-2xl border border-border p-5"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`mt-1 h-3 w-3 rounded-full ${event.color}`}
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {event.title}
                    </h3>

                    <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock3 className="h-4 w-4" />
                        {event.time}
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {event.team}
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}