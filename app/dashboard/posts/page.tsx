import React, { useEffect, useState } from "react";
import axios from "axios";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify";
import useDataStore from "@/store/useDataStore";
import RouteProtector from "@/api/RouteProtector";
import Sidebar from "@/components/dashboard/Sidebar";
import DarkModeToggle from "@/components/global/DarkModeToggle";

const PostsPage = () => {
  const user = useDataStore((state) => state.user);
  const posts = useDataStore((state) => state.posts);
  const setPosts = useDataStore((state) => state.setPosts);
  const darkMode = useDataStore((state) => state.darkMode);
  const [localPosts, setLocalPosts] = useState(posts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
        setLocalPosts(response.data);
      } catch {
        toast.error("Failed to fetch posts");
      }
    };

    if (posts.length === 0) {
      fetchPosts();
    }
  }, [posts.length, setPosts]);

  // Handlers for edit/delete (simulate locally)
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      const updated = localPosts.filter((post) => post.id !== id);
      setLocalPosts(updated);
      toast.success("Post deleted");
    }
  };

  const handleEdit = (id: number) => {
    const newTitle = prompt("Enter new title:");
    if (newTitle) {
      const updated = localPosts.map((post) =>
        post.id === id ? { ...post, title: newTitle } : post
      );
      setLocalPosts(updated);
      toast.success("Post updated");
    }
  };

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
              Posts
            </h1>
            <DarkModeToggle />
          </header>
          <ul className={twMerge("space-y-4 max-w-4xl")}>
            {localPosts.map((post) => (
              <li
                key={post.id}
                className={twMerge(
                  "p-4 rounded shadow bg-white dark:bg-gray-700",
                  darkMode ? "text-gray-200" : "text-gray-900"
                )}
              >
                <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
                <p className="mb-2 text-gray-600 dark:text-gray-300">
                  {post.body}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  User ID: {post.userId}
                </p>
                {user?.role === "admin" && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleEdit(post.id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </main>
      </div>
    </RouteProtector>
  );
};

export default PostsPage;
