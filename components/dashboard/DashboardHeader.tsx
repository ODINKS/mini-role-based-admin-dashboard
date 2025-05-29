"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import { FaHome, FaFileAlt, FaSun, FaBars } from "react-icons/fa";

interface Props {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardHeader: React.FC<Props> = ({ setSidebarOpen }) => {
  const pathname = usePathname();

  const pageMap: Record<string, { icon: React.ReactNode; title: string }> = {
    "/dashboard": { icon: <FaHome />, title: "Home" },
    "/dashboard/posts": { icon: <FaFileAlt />, title: "Posts" },
  };

  const current = pageMap[pathname] || { icon: null, title: "" };

  return (
    <header
      className={twMerge(
        "flex items-center justify-between px-4 py-4 border-b border-gray-200 bg-white sticky top-0 z-20"
      )}
    >
      <div className="flex items-center gap-3">
        {/* Hamburger menu, only visible on small screens */}
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
          className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
        >
          <FaBars size={24} />
        </button>

        {/* Current page */}
        <div className="flex items-center gap-2 text-gray-900 text-xl font-semibold select-none">
          {current.icon}
          <span>{current.title}</span>
        </div>
      </div>

      {/* Theme toggle (non functional) */}
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
