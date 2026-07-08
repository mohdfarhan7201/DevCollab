import React from "react";

const ConversationList = ({
  conversations = [],
  activeConversation,
  onSelect,
}) => {
  return (
    <div className="w-full h-full border-r border-gray-200 dark:border-gray-800">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-semibold">
          Messages
        </h2>
      </div>

      <div className="overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-5 text-gray-500 text-sm">
            No conversations found
          </div>
        ) : (
          conversations.map((conversation) => (
            <button
              key={conversation._id}
              onClick={() => onSelect(conversation)}
              className={`w-full flex items-center gap-3 p-4 text-left hover:bg-gray-100 dark:hover:bg-gray-900 transition ${
                activeConversation?._id === conversation._id
                  ? "bg-gray-100 dark:bg-gray-900"
                  : ""
              }`}
            >
              <img
                src={
                  conversation.avatar ||
                  "https://ui-avatars.com/api/?name=User"
                }
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />

              <div>
                <p className="font-medium">
                  {conversation.name}
                </p>

                <p className="text-sm text-gray-500 truncate max-w-[180px]">
                  {conversation.lastMessage || "Start conversation"}
                </p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default ConversationList;