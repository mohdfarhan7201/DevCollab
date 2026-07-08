import { useEffect, useRef, useState } from "react";

import {
  getConversation,
  markConversationRead,
  sendMessage,
} from "../api/message.api";

import useSocket from "./useSocket";

export default function useConversation(
  selectedUser
) {
  const {
    socket,
    onlineUsers,
  } = useSocket();

  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [typing, setTyping] =
    useState(false);

  const typingTimeout =
    useRef(null);

  // ==========================
  // Load Conversation
  // ==========================

  useEffect(() => {
    if (!selectedUser) return;

    loadConversation();
  }, [selectedUser]);

  const loadConversation =
    async () => {
      try {
        setLoading(true);

        const data =
          await getConversation(
            selectedUser._id
          );

        setMessages(data);

        await markConversationRead(
          selectedUser._id
        );
      } finally {
        setLoading(false);
      }
    };

  // ==========================
  // Socket Events
  // ==========================

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage =
      (message) => {
        if (
          message.sender._id ===
            selectedUser?._id ||
          message.receiver._id ===
            selectedUser?._id
        ) {
          setMessages((prev) => {
            if (
              prev.find(
                (m) =>
                  m._id === message._id
              )
            ) {
              return prev;
            }

            return [
              ...prev,
              message,
            ];
          });
        }
      };

    const handleTyping =
      (senderId) => {
        if (
          senderId ===
          selectedUser?._id
        ) {
          setTyping(true);

          clearTimeout(
            typingTimeout.current
          );

          typingTimeout.current =
            setTimeout(() => {
              setTyping(false);
            }, 2000);
        }
      };

    const handleStopTyping =
      (senderId) => {
        if (
          senderId ===
          selectedUser?._id
        ) {
          setTyping(false);
        }
      };

    socket.on(
      "new-message",
      handleNewMessage
    );

    socket.on(
      "typing",
      handleTyping
    );

    socket.on(
      "stop-typing",
      handleStopTyping
    );

    return () => {
      socket.off(
        "new-message",
        handleNewMessage
      );

      socket.off(
        "typing",
        handleTyping
      );

      socket.off(
        "stop-typing",
        handleStopTyping
      );
    };
  }, [socket, selectedUser]);

  // ==========================
  // Send Message
  // ==========================

  const send =
    async (text) => {
      if (
        !text.trim() ||
        !selectedUser
      ) {
        return;
      }

      const message =
        await sendMessage(
          selectedUser._id,
          {
            text,
          }
        );

      setMessages((prev) => [
        ...prev,
        message,
      ]);

      return message;
    };

  // ==========================
  // Typing Events
  // ==========================

  const startTyping = () => {
    if (
      socket &&
      selectedUser
    ) {
      socket.emit("typing", {
        receiverId:
          selectedUser._id,
      });
    }
  };

  const stopTyping = () => {
    if (
      socket &&
      selectedUser
    ) {
      socket.emit(
        "stop-typing",
        {
          receiverId:
            selectedUser._id,
        }
      );
    }
  };

  return {
    messages,
    loading,
    typing,
    send,
    startTyping,
    stopTyping,
    online:
      selectedUser &&
      onlineUsers.includes(
        selectedUser._id
      ),
  };
}