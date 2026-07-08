import React from "react";
import NotificationItem from "./NotificationItem";

const NotificationDropdown = ({
  notifications,
  markAsRead,
  markAllRead,
  deleteNotification,
}) => {
  return (
    <div
      className="
      absolute
      right-0
      mt-2
      w-[380px]
      rounded-xl
      border
      border-gray-200
      dark:border-gray-800
      bg-white
      dark:bg-gray-900
      shadow-xl
      z-50
      "
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="font-semibold">
          Notifications
        </h2>

        <button
          onClick={markAllRead}
          className="text-sm text-blue-600"
        >
          Mark all read
        </button>
      </div>

      <div className="max-h-[450px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No notifications
          </div>
        ) : (
          notifications.map(
            (notification) => (
              <NotificationItem
                key={notification._id}
                notification={
                  notification
                }
                onRead={markAsRead}
                onDelete={
                  deleteNotification
                }
              />
            )
          )
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;