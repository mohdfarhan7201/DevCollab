import React from "react";

const MessageBubble = ({ message, currentUserId }) => {
  const isMine =
    message.sender === currentUserId ||
    message.sender?._id === currentUserId;

  return (
    <div
      className={`flex mb-3 ${
        isMine ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`px-4 py-2 rounded-xl max-w-[70%] ${
          isMine
            ? "bg-blue-600 text-white"
            : "bg-gray-200 dark:bg-gray-800"
        }`}
      >
        <p>{message.text}</p>

        <span className="text-xs opacity-70 block mt-1">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;