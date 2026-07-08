import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import MessageBubble from "./MessageBubble";
import { useSocket } from "../../context/SocketContext";

const ChatWindow = ({
  conversation,
  messages = [],
  setMessages,
  currentUserId,
}) => {
  const [text, setText] = useState("");

  const messagesEndRef = useRef(null);

  const {
    emit,
    on,
    off,
    startTyping,
    stopTyping,
    typingUsers,
  } = useSocket();

  // =====================================
  // AUTO SCROLL
  // =====================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // =====================================
  // RECEIVE SOCKET MESSAGE
  // =====================================

  useEffect(() => {
    const addMessage = (message) => {
      setMessages?.((prev) => {
        const exists = prev.some(
          (m) => m._id === message._id
        );

        if (exists) return prev;

        return [...prev, message];
      });
    };

    on("message:receive", addMessage);

    on("message:sent", addMessage);

    return () => {
      off("message:receive", addMessage);

      off("message:sent", addMessage);
    };
  }, [on, off, setMessages]);

  // =====================================
  // SEND MESSAGE
  // =====================================

  const sendMessage = () => {
    if (!conversation) return;

    if (!text.trim()) return;

    emit("message:send", {
      receiverId: conversation._id,
      text: text.trim(),
    });

    stopTyping(conversation._id);

    setText("");
  };

  // =====================================
  // TYPING
  // =====================================

  const handleTyping = (value) => {
    setText(value);

    if (!conversation) return;

    if (value.trim()) {
      startTyping(conversation._id);
    } else {
      stopTyping(conversation._id);
    }
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a conversation
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">

      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="font-semibold">
          {conversation.name}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">

        {messages.map((message) => (
          <MessageBubble
            key={message._id}
            message={message}
            currentUserId={currentUserId}
          />
        ))}

        {typingUsers.includes(conversation._id) && (
          <p className="text-sm text-gray-500 italic mt-2">
            Typing...
          </p>
        )}

        <div ref={messagesEndRef} />

      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex gap-3">

        <input
          value={text}
          onChange={(e) =>
            handleTyping(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Type a message..."
          className="flex-1 rounded-lg border px-4 py-2 dark:bg-gray-900"
        />

        <button
          onClick={sendMessage}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white"
        >
          Send
        </button>

      </div>

    </div>
  );
};

export default ChatWindow;