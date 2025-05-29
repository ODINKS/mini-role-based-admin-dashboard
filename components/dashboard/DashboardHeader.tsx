"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import useDataStore from "@/store/useDataStore";

const DashboardHeader = () => {
  const user = useDataStore((state) => state.user);

  return (
    <header
      className={twMerge(
        "flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-20"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 font-bold text-blue-600 text-xl select-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        <span>Dashlytics</span>
      </div>

      {/* Page title or welcome message */}
      <div className="flex-1 text-center text-gray-900 font-semibold text-lg select-none">
        {user ? `Welcome back, ${user.username}!` : "Dashboard"}
      </div>

      {/* User info */}
      <div className="flex items-center gap-4 text-gray-700 select-none">
        <div className="flex flex-col text-right">
          <span className="font-semibold">{user?.username}</span>
          <span className="text-sm text-gray-500">{user?.role}</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold uppercase">
          {user?.username?.charAt(0) || "U"}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
