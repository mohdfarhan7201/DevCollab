import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import MobileSidebar from "../components/dashboard/MobileSidebar";
import Topbar from "../components/dashboard/Topbar";

export default function DashboardLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar */}

      <MobileSidebar
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex">
        {/* Desktop Sidebar */}

        <Sidebar />

        {/* Content */}

        <div className="flex min-h-screen flex-1 flex-col overflow-hidden">
          <Topbar
            onMenuClick={() => setMobileSidebarOpen(true)}
          />

          <main className="flex-1 bg-muted/20">
            <div className="mx-auto w-full max-w-[1600px] p-4 md:p-6 lg:p-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}