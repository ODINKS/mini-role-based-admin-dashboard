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
} from "recharts";
import { toast } from "react-toastify";
import useDataStore from "@/store/useDataStore";
// import DarkModeToggle from "@/components/global/DarkModeToggle"; // commented out per request

const DashboardHome = () => {
  const setPosts = useDataStore((state) => state.setPosts);
  const posts = useDataStore((state) => state.posts);

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
    <>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Dashboard Home</h1>
        {/* <DarkModeToggle /> */}
      </header>

      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-medium mb-4 text-gray-800">
          Posts Count by User
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="userId"
              stroke="#374151"
              tick={{ fill: "#374151" }}
            />
            <YAxis stroke="#374151" />
            <Tooltip />
            <Bar dataKey="postsCount" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </>
  );
};

export default DashboardHome;
