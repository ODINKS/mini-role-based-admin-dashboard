"use client";
import React, { useState } from "react";
import RouteProtector from "@/api/RouteProtector";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <RouteProtector allowedRoles={["admin", "editor"]}>
      <div className="flex min-h-screen bg-gray-100 text-gray-900">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex flex-col flex-1 ml-0 md:ml-64">
          <DashboardHeader setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 p-4 md:p-8 overflow-auto">{children}</main>
        </div>
      </div>
    </RouteProtector>
  );
}

export default DashboardLayout;
