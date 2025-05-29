"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify";
import useDataStore from "@/store/useDataStore";
import Pagination from "@/components/dashboard/Pagination";

const POSTS_PER_PAGE = 9;

const PostsPage = () => {
  const user = useDataStore((state) => state.user);
  const posts = useDataStore((state) => state.posts);
  const setPosts = useDataStore((state) => state.setPosts);
  const [localPosts, setLocalPosts] = useState(posts);
  const [currentPage, setCurrentPage] = useState(1);

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
      // If current page becomes empty after delete, go to prev page
      if (
        updated.length <= (currentPage - 1) * POSTS_PER_PAGE &&
        currentPage > 1
      ) {
        setCurrentPage(currentPage - 1);
      }
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

  // Calculate paginated posts
  const totalPosts = localPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const displayedPosts = localPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  if (localPosts.length === 0) {
    return (
      <section className="text-center text-gray-600 mt-20">
        <p className="text-xl">No posts available.</p>
      </section>
    );
  }

  return (
    <>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Posts</h1>
        {/* <DarkModeToggle /> */}
      </header>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {displayedPosts.map((post) => (
          <article
            key={post.id}
            className={twMerge(
              "bg-white rounded-lg shadow-md p-5 flex flex-col justify-between",
              "text-gray-900 hover:shadow-lg transition-shadow duration-300"
            )}
          >
            <div>
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-700 mb-3 line-clamp-4">{post.body}</p>
              <p className="text-sm text-gray-500">User ID: {post.userId}</p>
            </div>

            {user?.role === "admin" && (
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleEdit(post.id)}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label={`Edit post titled ${post.title}`}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                  aria-label={`Delete post titled ${post.title}`}
                >
                  Delete
                </button>
              </div>
            )}
          </article>
        ))}
      </section>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default PostsPage;
