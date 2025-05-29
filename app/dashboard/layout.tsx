"use client";
import React from "react";
import RouteProtector from "@/api/RouteProtector";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <RouteProtector allowedRoles={["admin", "editor"]}>
      <div className="flex min-h-screen bg-gray-100 text-gray-900">
        <Sidebar />
        <div className="flex flex-col flex-1 ml-64">
          <DashboardHeader />
          <main className="flex-1 p-8 overflow-auto">{children}</main>
        </div>
      </div>
    </RouteProtector>
  );
}

export default DashboardLayout;
