"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import { FaHome, FaFileAlt, FaSun } from "react-icons/fa";

const DashboardHeader = () => {
  const pathname = usePathname();

  // Map path to title + icon
  const pageMap: Record<string, { icon: React.ReactNode; title: string }> = {
    "/dashboard": { icon: <FaHome />, title: "Home" },
    "/dashboard/posts": { icon: <FaFileAlt />, title: "Posts" },
  };

  const current = pageMap[pathname] || { icon: null, title: "" };

  return (
    <header
      className={twMerge(
        "flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-20"
      )}
    >
      {/* Left: current page icon + title */}
      <div className="flex items-center gap-3 text-gray-900 text-xl font-semibold select-none">
        {current.icon}
        <span>{current.title}</span>
      </div>

      {/* Right: theme toggle icon (non-functional) */}
      <button
        aria-label="Toggle theme"
        className="text-gray-700 hover:text-blue-600 focus:outline-none"
        disabled
      >
        <FaSun size={20} />
      </button>
    </header>
  );
};

export default DashboardHeader;
