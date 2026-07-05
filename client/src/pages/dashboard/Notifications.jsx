import {
  Bell,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  GitPullRequest,
  UserPlus,
  Trash2,
  Check,
  Filter,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "pull",
    title: "New Pull Request",
    message: "Rahul Sharma opened PR #142 for authentication module.",
    time: "2 min ago",
    unread: true,
  },
  {
    id: 2,
    type: "message",
    title: "New Message",
    message: "Anjali Verma sent you a new design update.",
    time: "12 min ago",
    unread: true,
  },
  {
    id: 3,
    type: "member",
    title: "New Team Member",
    message: "Mohit Singh joined Frontend Team.",
    time: "1 hour ago",
    unread: false,
  },
  {
    id: 4,
    type: "success",
    title: "Deployment Successful",
    message: "Production deployment completed successfully.",
    time: "3 hours ago",
    unread: false,
  },
  {
    id: 5,
    type: "warning",
    title: "Build Failed",
    message: "TaskFlow build failed on the staging environment.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 6,
    type: "message",
    title: "Sprint Reminder",
    message: "Sprint Planning meeting starts in 30 minutes.",
    time: "Yesterday",
    unread: false,
  },
];

function NotificationIcon({ type }) {
  switch (type) {
    case "pull":
      return (
        <div className="rounded-xl bg-violet-500/10 p-3 text-violet-500">
          <GitPullRequest className="h-5 w-5" />
        </div>
      );

    case "message":
      return (
        <div className="rounded-xl bg-sky-500/10 p-3 text-sky-500">
          <MessageSquare className="h-5 w-5" />
        </div>
      );

    case "member":
      return (
        <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-500">
          <UserPlus className="h-5 w-5" />
        </div>
      );

    case "warning":
      return (
        <div className="rounded-xl bg-orange-500/10 p-3 text-orange-500">
          <AlertCircle className="h-5 w-5" />
        </div>
      );

    default:
      return (
        <div className="rounded-xl bg-primary/10 p-3 text-primary">
          <CheckCircle2 className="h-5 w-5" />
        </div>
      );
  }
}

export default function Notifications() {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-bold">
            <Bell className="h-8 w-8 text-primary" />
            Notifications
          </h1>

          <p className="mt-2 text-muted-foreground">
            Stay updated with your projects, teams and activities.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 hover:bg-muted">
            <Filter className="h-4 w-4" />
            Filter
          </button>

          <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 font-medium text-primary-foreground hover:opacity-90">
            <Check className="h-4 w-4" />
            Mark all as read
          </button>
        </div>
      </div>

      {/* Notifications */}

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex gap-5 border-b border-border p-6 transition hover:bg-muted/40 ${
              notification.unread ? "bg-primary/5" : ""
            }`}
          >
            <NotificationIcon type={notification.type} />

            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold">
                      {notification.title}
                    </h2>

                    {notification.unread && (
                      <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                    )}
                  </div>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {notification.message}
                  </p>
                </div>

                <span className="whitespace-nowrap text-sm text-muted-foreground">
                  {notification.time}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted">
                  Mark as Read
                </button>

                <button className="rounded-lg border border-red-500/20 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10">
                  <span className="flex items-center gap-2">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}