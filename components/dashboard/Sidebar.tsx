"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChartBar, FaFileAlt, FaSignOutAlt } from "react-icons/fa";
import tokenManager from "@/api/tokenManager";
import useDataStore from "@/store/useDataStore";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const user = useDataStore((state) => state.user);
  const router = useRouter();
  const pathname = usePathname();
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);

  if (!user) return null;

  const handleLogout = () => {
    tokenManager.removeUser();
    useDataStore.getState().setUser(null);
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
    <aside className="w-64 min-h-screen bg-white shadow-md p-6 flex flex-col justify-between fixed top-0 left-0">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10 font-bold text-blue-600 text-xl select-none">
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

      {/* Navigation */}
      <nav>
        <ul className="space-y-4">
          {navItems.map(({ href, label, icon }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 text-gray-700 hover:text-blue-600 ${
                    isActive ? "font-semibold text-blue-600" : ""
                  }`}
                >
                  {icon} {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User info and logout */}
      <div className="relative mt-6 flex items-center gap-3 border-t border-gray-200 pt-4">
        {/* Dummy circular profile image */}
        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg uppercase">
          {user.username?.charAt(0) || "U"}
        </div>

        {/* User info */}
        <div className="flex flex-col flex-grow">
          <span className="text-gray-900 font-semibold">{user.username}</span>
          <span className="text-gray-500 text-sm">{user.role}</span>
        </div>

        {/* Logout icon */}
        <button
          onClick={() => setShowLogoutDropdown((prev) => !prev)}
          className="text-gray-700 hover:text-red-600 focus:outline-none"
          aria-label="Toggle logout menu"
        >
          <FaSignOutAlt size={20} />
        </button>

        {/* Logout dropdown */}
        {showLogoutDropdown && (
          <div className="absolute bottom-16 right-6 bg-white border border-gray-300 rounded shadow-md w-32 z-10">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
