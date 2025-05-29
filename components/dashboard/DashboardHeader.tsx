"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import { FaHome, FaFileAlt, FaBars } from "react-icons/fa";
import DarkModeToggle from "@/components/global/DarkModeToggle";

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
        "flex items-center justify-between px-4 py-4 border-b border-gray-200 bg-white sticky top-0 z-20",
        "dark:bg-gray-900 dark:border-gray-700"
      )}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
          className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none dark:text-gray-300 dark:hover:text-blue-400"
        >
          <FaBars size={24} />
        </button>

        <div className="flex items-center gap-2 text-gray-900 text-xl font-semibold select-none dark:text-gray-200">
          {current.icon}
          <span>{current.title}</span>
        </div>
      </div>

      <DarkModeToggle />
    </header>
  );
};

export default DashboardHeader;
