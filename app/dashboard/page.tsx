"use client";
import React, { useEffect, useState } from "react";
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
import { useBreakpoint } from "@/hooks/UseBreakPoint";

const COLORS = [
  "#3B82F6",
  "#EF4444",
  "#F59E0B",
  "#10B981",
  "#8B5CF6",
  "#EC4899",
];

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

const DashboardHome = () => {
  const setPosts = useDataStore((state) => state.setPosts);
  const posts = useDataStore((state) => state.posts);
  const user = useDataStore((state) => state.user);
  const [users, setUsers] = useState<User[]>([]);
  const { isXsOnly } = useBreakpoint();

  useEffect(() => {
    const fetchUsersAndPosts = async () => {
      try {
        const [usersRes, postsRes] = await Promise.all([
          axios.get("https://jsonplaceholder.typicode.com/users"),
          axios.get("https://jsonplaceholder.typicode.com/posts"),
        ]);
        setUsers(usersRes.data);
        setPosts(postsRes.data);
      } catch {
        toast.error("Failed to fetch data");
      }
    };

    if (posts.length === 0 || users.length === 0) {
      fetchUsersAndPosts();
    }
  }, [posts.length, setPosts, users.length]);

  const chartData = users.map((user) => {
    const count = posts.filter((post) => post.userId === user.id).length;
    return { name: user.username, postsCount: count };
  });

  const totalPosts = posts.length;
  const legendMarginTop = isXsOnly ? 100 : 20;

  return (
    <>
      <h1 className="text-4xl font-bold mb-6 dark:text-gray-200">
        Welcome, {user?.username || "User"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Total Posts
          </h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {totalPosts}
          </p>
          <p className="text-gray-500 mt-1 text-sm dark:text-gray-400">
            Total number of posts created in the system.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Unique Users
          </h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {users.length}
          </p>
          <p className="text-gray-500 mt-1 text-sm dark:text-gray-400">
            Number of distinct users who have created posts.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Avg Posts/User
          </h3>
          <p className="text-3xl font-bold text-yellow-500 dark:text-yellow-400">
            {(totalPosts / users.length).toFixed(2)}
          </p>
          <p className="text-gray-500 mt-1 text-sm dark:text-gray-400">
            Average posts created by each user.
          </p>
        </div>
      </div>

      {/* You could use InputField or Button if you have filters or controls here */}
      {/* Example: <InputField label="Filter posts" /> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
          <h2 className="text-xl font-medium mb-4 text-gray-800 dark:text-gray-200">
            Posts Count by User
          </h2>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={chartData}
              margin={{ top: 40, right: 10, left: 10, bottom: 70 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                stroke="#374151"
                tick={{ fill: "#374151", fontSize: 12 }}
                interval={0}
                angle={-30}
                textAnchor="end"
                height={70}
                label={{
                  value: "Users",
                  position: "insideBottomRight",
                  offset: -10,
                  fontSize: 14,
                }}
              />
              <YAxis
                stroke="#374151"
                label={{
                  value: "Number of Posts",
                  angle: -90,
                  position: "insideLeft",
                  offset: 20,
                  fontSize: 14,
                }}
              />
              <Tooltip />
              <Bar dataKey="postsCount" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
          <p className="mt-3 text-gray-500 text-sm dark:text-gray-400">
            This bar chart shows how many posts each user has created. Useful
            for identifying top contributors.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
          <h2 className="text-xl font-medium mb-4 text-gray-800 dark:text-gray-200">
            Posts Distribution by User (Pie Chart)
          </h2>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="postsCount"
                nameKey="name"
                cx="50%"
                cy="55%"
                outerRadius={85}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                align="center"
                layout="horizontal"
                wrapperStyle={{ marginTop: legendMarginTop, color: "inherit" }}
              />

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <p className="mt-3 text-gray-500 text-sm dark:text-gray-400">
            The pie chart represents the percentage of total posts contributed
            by each user.
          </p>
        </section>
      </div>
    </>
  );
};

export default DashboardHome;
