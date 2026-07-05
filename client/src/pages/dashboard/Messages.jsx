import { useState } from "react";
import {
  Search,
  SendHorizonal,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
} from "lucide-react";

const conversations = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Backend Developer",
    avatar: "https://i.pravatar.cc/150?img=12",
    online: true,
    lastMessage: "API deployment is finished.",
    unread: 2,
  },
  {
    id: 2,
    name: "Anjali Verma",
    role: "UI/UX Designer",
    avatar: "https://i.pravatar.cc/150?img=32",
    online: true,
    lastMessage: "I've uploaded the latest design.",
    unread: 0,
  },
  {
    id: 3,
    name: "Mohit Singh",
    role: "DevOps Engineer",
    avatar: "https://i.pravatar.cc/150?img=18",
    online: false,
    lastMessage: "Server logs look good.",
    unread: 0,
  },
  {
    id: 4,
    name: "Sneha Gupta",
    role: "Mobile Developer",
    avatar: "https://i.pravatar.cc/150?img=45",
    online: true,
    lastMessage: "Testing starts tomorrow.",
    unread: 1,
  },
];

const messages = [
  {
    id: 1,
    sender: "them",
    text: "Hey, how's the authentication module going?",
    time: "09:12",
  },
  {
    id: 2,
    sender: "me",
    text: "Almost finished. Just testing JWT refresh flow.",
    time: "09:15",
  },
  {
    id: 3,
    sender: "them",
    text: "Awesome. Push it today so I can integrate.",
    time: "09:16",
  },
  {
    id: 4,
    sender: "me",
    text: "Sure 👍",
    time: "09:17",
  },
];

export default function Messages() {
  const [message, setMessage] = useState("");

  return (
    <div className="grid h-[calc(100vh-10rem)] overflow-hidden rounded-2xl border border-border bg-card lg:grid-cols-[360px_1fr]">
      {/* Sidebar */}

      <aside className="flex flex-col border-r border-border">
        <div className="border-b border-border p-5">
          <h1 className="text-2xl font-bold">Messages</h1>

          <div className="relative mt-5">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="text"
              placeholder="Search..."
              className="h-11 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((user) => (
            <button
              key={user.id}
              className="flex w-full items-center gap-4 border-b border-border p-4 text-left transition hover:bg-muted/50"
            >
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-12 w-12 rounded-full object-cover"
                />

                {user.online && (
                  <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-background bg-green-500" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="truncate font-semibold">
                    {user.name}
                  </h3>

                  {user.unread > 0 && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                      {user.unread}
                    </span>
                  )}
                </div>

                <p className="text-xs text-muted-foreground">
                  {user.role}
                </p>

                <p className="truncate text-sm text-muted-foreground">
                  {user.lastMessage}
                </p>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Chat */}

      <section className="flex flex-col">
        <div className="flex items-center justify-between border-b border-border p-5">
          <div className="flex items-center gap-4">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="Rahul"
              className="h-12 w-12 rounded-full"
            />

            <div>
              <h2 className="font-semibold">Rahul Sharma</h2>

              <p className="text-sm text-green-500">
                Online
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="rounded-xl border border-border p-2 hover:bg-muted">
              <Phone className="h-5 w-5" />
            </button>

            <button className="rounded-xl border border-border p-2 hover:bg-muted">
              <Video className="h-5 w-5" />
            </button>

            <button className="rounded-xl border border-border p-2 hover:bg-muted">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto bg-muted/20 p-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "me"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-md rounded-2xl px-5 py-3 ${
                  msg.sender === "me"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background border border-border"
                }`}
              >
                <p>{msg.text}</p>

                <p className="mt-2 text-right text-xs opacity-70">
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border p-5">
          <div className="flex items-center gap-3">
            <button className="rounded-xl border border-border p-3 hover:bg-muted">
              <Paperclip className="h-5 w-5" />
            </button>

            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message..."
              className="h-12 flex-1 rounded-xl border border-border bg-background px-4 outline-none focus:border-primary"
            />

            <button className="rounded-xl border border-border p-3 hover:bg-muted">
              <Smile className="h-5 w-5" />
            </button>

            <button className="rounded-xl bg-primary p-3 text-primary-foreground transition hover:opacity-90">
              <SendHorizonal className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}