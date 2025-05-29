"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaChartBar,
  FaFileAlt,
  FaSignOutAlt,
  FaUserCircle,
  FaTimes,
} from "react-icons/fa";
import tokenManager from "@/api/tokenManager";
import useDataStore from "@/store/useDataStore";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const user = useDataStore((state) => state.user);
  const router = useRouter();
  const pathname = usePathname();
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  useEffect(() => {
    if (setSidebarOpen) {
      setSidebarOpen(false);
    }
  }, [pathname, setSidebarOpen]);

  if (!user) return null;

  const handleLogout = () => {
    tokenManager.removeUser();
    useDataStore.getState().setUser(null);
    useDataStore.getState().setJustLoggedOut(true);
    setShowLogoutDropdown(false);
    router.push("/login");
    import("react-toastify").then(({ toast }) => {
      toast.success("Logout successful");
    });
  };

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: <FaChartBar /> },
    { href: "/dashboard/posts", label: "Posts", icon: <FaFileAlt /> },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={twMerge(
          "fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden",
          sidebarOpen ? "block" : "hidden"
        )}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={twMerge(
          "fixed top-0 left-0 bottom-0 w-64 bg-white shadow-md p-6 flex flex-col z-50 transform transition-transform duration-300 md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "dark:bg-gray-900 dark:shadow-lg"
        )}
      >
        {/* Mobile Close Button */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <div className="flex items-center gap-2 font-bold text-blue-600 text-2xl select-none dark:text-blue-400">
            Nicklytics
          </div>
          <button
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
            className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 focus:outline-none"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Desktop Logo */}
        <div className="hidden md:flex items-center gap-2 mb-6 font-bold text-blue-600 text-2xl select-none dark:text-blue-400">
          <span>Nicklytics</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-6 mt-4">
            {navItems.map(({ href, label, icon }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={twMerge(
                      "flex items-center gap-3 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400",
                      isActive
                        ? "font-semibold text-blue-600 dark:text-blue-400"
                        : ""
                    )}
                  >
                    {icon} {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Profile & Logout */}
        <div className="mt-6 border-t border-gray-200 pt-4 flex items-center justify-between relative dark:border-gray-700">
          <button
            onClick={() => setShowProfileDropdown((prev) => !prev)}
            className="flex items-center gap-3 focus:outline-none"
            aria-label="Toggle profile menu"
          >
            <FaUserCircle
              size={36}
              className="text-blue-500 dark:text-blue-400"
            />
            <div className="flex flex-col flex-grow text-left truncate">
              <span className="text-gray-900 font-semibold truncate dark:text-gray-100">
                {user.username}
              </span>
              <span className="text-gray-500 text-sm truncate dark:text-gray-400">
                {user.role}
              </span>
            </div>
          </button>

          <button
            onClick={() => setShowLogoutDropdown((prev) => !prev)}
            className="text-gray-700 hover:text-red-600 focus:outline-none dark:text-gray-300 dark:hover:text-red-500"
            aria-label="Toggle logout menu"
          >
            <FaSignOutAlt size={20} />
          </button>

          {/* Logout dropdown */}
          {showLogoutDropdown && (
            <div
              className="absolute bottom-full right-0 mb-4 bg-white border border-gray-300 rounded shadow-md w-32 z-50 dark:bg-gray-800 dark:border-gray-700"
              style={{ transform: "translate(40%, 40%)" }}
            >
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white transition dark:hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          )}

          {/* Profile dropdown */}
          {showProfileDropdown && (
            <div className="absolute left-0 bottom-full mb-16 w-full bg-white border border-gray-300 rounded shadow-md p-4 z-50 dark:bg-gray-800 dark:border-gray-700">
              <div className="mb-3">
                <label className="block text-gray-700 text-sm mb-1 dark:text-gray-300">
                  Username
                </label>
                <input
                  type="text"
                  defaultValue={user.username}
                  className="w-full px-3 py-2 border border-gray-300 rounded dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-1 dark:text-gray-300">
                  Role
                </label>
                <input
                  type="text"
                  defaultValue={user.role ?? ""}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
                />
              </div>
              <button
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
                onClick={() => setShowProfileDropdown(false)}
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
