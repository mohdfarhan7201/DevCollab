import React, {
  useState,
} from "react";

import { Bell } from "lucide-react";

import useNotifications from "../../hooks/useNotifications";

import NotificationDropdown from "./NotificationDropdown";

const NotificationBell = () => {
  const [open, setOpen] =
    useState(false);

  const {
    notifications,
    markAsRead,
    markAllRead,
    deleteNotification,
  } = useNotifications();

  const unreadCount =
    notifications.filter(
      (n) => !n.isRead
    ).length;

  return (
    <div className="relative">
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="relative"
      >
        <Bell size={22} />

        {unreadCount > 0 && (
          <span
            className="
            absolute
            -top-2
            -right-2
            h-5
            w-5
            rounded-full
            bg-red-500
            text-white
            text-xs
            flex
            items-center
            justify-center
            "
          >
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <NotificationDropdown
          notifications={
            notifications
          }
          markAsRead={
            markAsRead
          }
          markAllRead={
            markAllRead
          }
          deleteNotification={
            deleteNotification
          }
        />
      )}
    </div>
  );
};

export default NotificationBell;