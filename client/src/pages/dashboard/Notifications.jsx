import { useEffect, useMemo, useState } from "react";

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

import {
  getNotificationsApi,
  markNotificationReadApi,
  markAllNotificationsReadApi,
  deleteNotificationApi,
} from "../../api/notification.api";

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

    case "follow":
      return (
        <div className="rounded-xl bg-pink-500/10 p-3 text-pink-500">
          <UserPlus className="h-5 w-5" />
        </div>
      );

    case "comment":
      return (
        <div className="rounded-xl bg-blue-500/10 p-3 text-blue-500">
          <MessageSquare className="h-5 w-5" />
        </div>
      );

    case "like":
      return (
        <div className="rounded-xl bg-red-500/10 p-3 text-red-500">
          ❤️
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
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const response = await getNotificationsApi();

      setNotifications(response.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.isRead).length,
    [notifications]
  );

  const visibleNotifications = useMemo(() => {
    if (!showUnreadOnly) return notifications;

    return notifications.filter((item) => !item.isRead);
  }, [notifications, showUnreadOnly]);

  const markAllAsRead = async () => {
    try {
      await markAllNotificationsReadApi();
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await markNotificationReadApi(id);
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const removeNotification = async (id) => {
    try {
      await deleteNotificationApi(id);
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex h-80 items-center justify-center">
        <div className="text-lg">
          Loading notifications...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-bold">
            <Bell className="h-8 w-8 text-primary" />
            Notifications

            {unreadCount > 0 && (
              <span className="rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground">
                {unreadCount}
              </span>
            )}
          </h1>

          <p className="mt-2 text-muted-foreground">
            Stay updated with your projects, teams and activities.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowUnreadOnly((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 hover:bg-muted"
          >
            <Filter className="h-4 w-4" />
            {showUnreadOnly ? "Show All" : "Unread Only"}
          </button>

          <button
            onClick={markAllAsRead}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 font-medium text-primary-foreground hover:opacity-90"
          >
            <Check className="h-4 w-4" />
            Mark all as read
          </button>
        </div>
      </div>

      {visibleNotifications.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-16 text-center">
          <Bell className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

          <h2 className="text-xl font-semibold">
            No notifications
          </h2>

          <p className="mt-2 text-muted-foreground">
            You're all caught up.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {visibleNotifications.map((notification) => (
            <div
              key={notification._id}
              className={`flex gap-5 border-b border-border p-6 transition hover:bg-muted/40 ${
                !notification.isRead ? "bg-primary/5" : ""
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

                      {!notification.isRead && (
                        <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                      )}
                    </div>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {notification.sender?.name
                        ? `${notification.sender.name} ${notification.message}`
                        : notification.message}
                    </p>
                  </div>

                  <span className="whitespace-nowrap text-sm text-muted-foreground">
                    {new Date(notification.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  {!notification.isRead && (
                    <button
                      onClick={() => markAsRead(notification._id)}
                      className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted"
                    >
                      Mark as Read
                    </button>
                  )}

                  <button
                    onClick={() =>
                      removeNotification(notification._id)
                    }
                    className="rounded-lg border border-red-500/20 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10"
                  >
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
      )}
    </div>
  );
}