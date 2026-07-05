import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  X,
  LayoutDashboard,
  FolderKanban,
  Users,
  MessageSquare,
  CalendarDays,
  Bell,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { IoLogoGithub } from "react-icons/io";

const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    title: "Teams",
    href: "/dashboard/teams",
    icon: Users,
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
  },
  {
    title: "Calendar",
    href: "/dashboard/calendar",
    icon: CalendarDays,
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function MobileSidebar({ open, onClose }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[100] lg:hidden"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transform transition duration-300"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition duration-200"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="flex w-80 flex-col bg-background shadow-2xl">
              {/* Header */}

              <div className="flex items-center justify-between border-b border-border p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                    <IoLogoGithub className="h-6 w-6" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold">
                      DevCollab
                    </h2>

                    <p className="text-xs text-muted-foreground">
                      Team Workspace
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="rounded-xl border border-border p-2 hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation */}

              <nav className="flex-1 space-y-2 overflow-y-auto p-4">
                {navigation.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      end={item.href === "/dashboard"}
                      onClick={onClose}
                      className={({ isActive }) =>
                        clsx(
                          "flex items-center gap-3 rounded-xl px-4 py-3 transition",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                        )
                      }
                    >
                      <Icon className="h-5 w-5" />

                      <span className="font-medium">
                        {item.title}
                      </span>
                    </NavLink>
                  );
                })}
              </nav>

              {/* Footer */}

              <div className="border-t border-border p-5">
                <div className="flex items-center gap-3 rounded-2xl bg-muted/40 p-3">
                  <img
                    src="https://i.pravatar.cc/150?img=12"
                    alt="User"
                    className="h-12 w-12 rounded-xl object-cover"
                  />

                  <div>
                    <h3 className="font-semibold">
                      Farhan Ali
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      Full Stack Developer
                    </p>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}