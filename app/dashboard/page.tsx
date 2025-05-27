import React, { useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import useDataStore from "@/store/useDataStore";
import DarkModeToggle from "@/components/global/DarkModeToggle";
import Sidebar from "@/components/dashboard/Sidebar";
import RouteProtector from "@/api/RouteProtector";

const DashboardHome = () => {
  const setPosts = useDataStore((state) => state.setPosts);
  const posts = useDataStore((state) => state.posts);
  // const user = useDataStore((state) => state.user);
  const darkMode = useDataStore((state) => state.darkMode);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch posts data: ");
      }
    };

    if (posts.length === 0) {
      fetchPosts();
    }
  }, [posts.length, setPosts]);

  const chartData = posts.reduce<{ userId: number; postsCount: number }[]>(
    (acc, post) => {
      const existing = acc.find((item) => item.userId === post.userId);
      if (existing) {
        existing.postsCount += 1;
      } else {
        acc.push({ userId: post.userId, postsCount: 1 });
      }
      return acc;
    },
    []
  );

  return (
    <RouteProtector allowedRoles={["admin", "editor"]}>
      <div
        className={twMerge(
          "flex min-h-screen",
          darkMode ? "bg-gray-900" : "bg-gray-100"
        )}
      >
        <Sidebar />
        <main className="flex-1 p-8">
          <header className="flex justify-between items-center mb-8">
            <h1
              className={twMerge(
                "text-3xl font-semibold",
                darkMode ? "text-gray-100" : "text-gray-900"
              )}
            >
              Dashboard Home
            </h1>
            <DarkModeToggle />
          </header>

          <section
            className={twMerge(
              "bg-white rounded-lg shadow p-6",
              darkMode ? "bg-gray-700" : "bg-white"
            )}
          >
            <h2
              className={twMerge(
                "text-xl font-medium mb-4",
                darkMode ? "text-gray-200" : "text-gray-800"
              )}
            >
              Posts Count by User
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={darkMode ? "#374151" : "#e5e7eb"}
                />
                <XAxis
                  dataKey="userId"
                  stroke={darkMode ? "#d1d5db" : "#374151"}
                  tick={{ fill: darkMode ? "#d1d5db" : "#374151" }}
                />
                <YAxis stroke={darkMode ? "#d1d5db" : "#374151"} />
                <Tooltip />
                <Bar dataKey="postsCount" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </section>
        </main>
      </div>
    </RouteProtector>
  );
};

export default DashboardHome;
