import React from "react";
import Link from "next/link";
import { FaChartBar, FaFileAlt, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import tokenManager from "@/api/tokenManager";
import useDataStore from "@/store/useDataStore";

const Sidebar = () => {
  const user = useDataStore((state) => state.user);
  const router = useRouter();

  const handleLogout = () => {
    tokenManager.removeUser();
    useDataStore.getState().setUser(null);
    router.push("/auth/login");
  };

  if (!user) return null;

  return (
    <aside className="w-64 min-h-screen bg-white dark:bg-gray-800 shadow-md p-6 flex flex-col justify-between">
      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="/dashboard">
              <a className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                <FaChartBar /> Dashboard
              </a>
            </Link>
          </li>

          <li>
            <Link href="/dashboard/posts">
              <a className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                <FaFileAlt /> Posts
              </a>
            </Link>
          </li>

          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600"
            >
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      </nav>
      <div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Role: {user.role}
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
