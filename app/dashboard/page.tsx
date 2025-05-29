"use client";
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
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { toast } from "react-toastify";
import useDataStore from "@/store/useDataStore";

const COLORS = [
  "#3B82F6",
  "#EF4444",
  "#F59E0B",
  "#10B981",
  "#8B5CF6",
  "#EC4899",
];

const DashboardHome = () => {
  const setPosts = useDataStore((state) => state.setPosts);
  const posts = useDataStore((state) => state.posts);
  const user = useDataStore((state) => state.user);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch posts data");
      }
    };

    if (posts.length === 0) {
      fetchPosts();
    }
  }, [posts.length, setPosts]);

  // Aggregate posts by userId
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

  const totalPosts = posts.length;

  return (
    <>
      <h1 className="text-4xl font-bold mb-6">
        Welcome, {user?.username || "User"}
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Total Posts
          </h3>
          <p className="text-3xl font-bold text-blue-600">{totalPosts}</p>
          <p className="text-gray-500 mt-1 text-sm">
            Total number of posts created in the system.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Unique Users
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {chartData.length}
          </p>
          <p className="text-gray-500 mt-1 text-sm">
            Number of distinct users who have created posts.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Avg Posts/User
          </h3>
          <p className="text-3xl font-bold text-yellow-500">
            {(totalPosts / chartData.length).toFixed(2)}
          </p>
          <p className="text-gray-500 mt-1 text-sm">
            Average posts created by each user.
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-medium mb-4 text-gray-800">
            Posts Count by User (Bar Chart)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="userId"
                stroke="#374151"
                tick={{ fill: "#374151" }}
                label={{
                  value: "User ID",
                  position: "insideBottomRight",
                  offset: -5,
                }}
              />
              <YAxis
                stroke="#374151"
                label={{
                  value: "Number of Posts",
                  angle: -90,
                  position: "insideLeft",
                  offset: 10,
                }}
              />
              <Tooltip />
              <Bar dataKey="postsCount" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
          <p className="mt-3 text-gray-500 text-sm">
            This bar chart shows how many posts each user has created. Useful
            for identifying top contributors.
          </p>
        </section>

        {/* Pie Chart */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-medium mb-4 text-gray-800">
            Posts Distribution by User (Pie Chart)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="postsCount"
                nameKey="userId"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <p className="mt-3 text-gray-500 text-sm">
            The pie chart represents the percentage of total posts contributed
            by each user.
          </p>
        </section>
      </div>
    </>
  );
};

export default DashboardHome;
