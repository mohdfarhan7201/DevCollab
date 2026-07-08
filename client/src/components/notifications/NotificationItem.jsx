import React from "react";
import { Trash2 } from "lucide-react";

const NotificationItem = ({
  notification,
  onRead,
  onDelete,
}) => {
  return (
    <div
      className={`border-b border-gray-200 dark:border-gray-800 p-4 transition ${
        notification.isRead
          ? ""
          : "bg-blue-50 dark:bg-blue-950/30"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex-1 cursor-pointer"
          onClick={() => {
            if (!notification.isRead) {
              onRead(notification._id);
            }
          }}
        >
          <h4 className="font-semibold text-sm">
            {notification.title}
          </h4>

          <p className="text-sm text-gray-500 mt-1">
            {notification.sender?.name
              ? `${notification.sender.name} ${notification.message}`
              : notification.message}
          </p>

          <p className="text-xs text-gray-400 mt-2">
            {new Date(
              notification.createdAt
            ).toLocaleString()}
          </p>
        </div>

        <button
          onClick={() =>
            onDelete(notification._id)
          }
          className="text-red-500 hover:text-red-600"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default NotificationItem;