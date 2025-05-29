"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify";
import useDataStore from "@/store/useDataStore";
import Pagination from "@/components/dashboard/Pagination";
import Modal from "@/components/global/Modal";
import InputField from "@/components/global/inputs/InputField";
import Button from "@/components/global/Button";

const POSTS_PER_PAGE = 9;

const PostsPage = () => {
  const user = useDataStore((state) => state.user);
  const posts = useDataStore((state) => state.posts);
  const setPosts = useDataStore((state) => state.setPosts);
  const [localPosts, setLocalPosts] = useState(posts);
  const [currentPage, setCurrentPage] = useState(1);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [activePost, setActivePost] = useState<(typeof localPosts)[0] | null>(
    null
  );
  const [editTitle, setEditTitle] = useState("");

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

  const openEditModal = (post: (typeof localPosts)[0]) => {
    setActivePost(post);
    setEditTitle(post.title);
    setEditModalOpen(true);
  };

  const saveEdit = () => {
    if (!editTitle.trim()) {
      toast.error("Title cannot be empty");
      return;
    }
    if (activePost) {
      const updated = localPosts.map((post) =>
        post.id === activePost.id ? { ...post, title: editTitle } : post
      );
      setLocalPosts(updated);
      toast.success("Post updated");
      setEditModalOpen(false);
      setActivePost(null);
    }
  };

  const openDeleteModal = (post: (typeof localPosts)[0]) => {
    setActivePost(post);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (activePost) {
      const updated = localPosts.filter((post) => post.id !== activePost.id);
      setLocalPosts(updated);
      toast.success("Post deleted");
      setDeleteModalOpen(false);
      setActivePost(null);
      if (
        updated.length <= (currentPage - 1) * POSTS_PER_PAGE &&
        currentPage > 1
      ) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const totalPosts = localPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const displayedPosts = localPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  if (localPosts.length === 0) {
    return (
      <section className="text-center text-gray-600 dark:text-gray-400 mt-20">
        <p className="text-xl">No posts available.</p>
      </section>
    );
  }

  return (
    <>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
          Posts
        </h1>
      </header>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {displayedPosts.map((post) => (
          <article
            key={post.id}
            className={twMerge(
              "bg-white rounded-lg shadow-md p-5 flex flex-col justify-between",
              "text-gray-900 hover:shadow-lg transition-shadow duration-300",
              "dark:bg-gray-800 dark:text-gray-200 dark:hover:shadow-xl"
            )}
          >
            <div>
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-700 mb-3 line-clamp-4 dark:text-gray-300">
                {post.body}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                User ID: {post.userId}
              </p>
            </div>

            {user?.role === "admin" && (
              <div className="mt-4 flex gap-3">
                <Button
                  onClick={() => openEditModal(post)}
                  buttonType="primary"
                  classNames="text-sm"
                  label="Edit"
                />
                <Button
                  onClick={() => openDeleteModal(post)}
                  buttonType="primary"
                  classNames="bg-red-600 hover:bg-red-700 text-sm"
                  label="Delete"
                />
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

      <Modal
        isOpen={editModalOpen}
        title="Edit Post Title"
        onClose={() => setEditModalOpen(false)}
      >
        <InputField
          name="edit"
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          aria-label="Edit post title input"
          classNames="mb-4"
        />
        <div className="flex justify-end gap-3">
          <Button
            onClick={() => setEditModalOpen(false)}
            buttonType="outline"
            label="Cancel"
          />
          <Button onClick={saveEdit} buttonType="primary" label="Save" />
        </div>
      </Modal>

      <Modal
        isOpen={deleteModalOpen}
        title="Confirm Delete"
        onClose={() => setDeleteModalOpen(false)}
      >
        <p className="mb-4 dark:text-gray-200">
          Are you sure you want to delete the post titled:{" "}
          <strong>&apos;{activePost?.title}&apos;</strong>?
        </p>
        <div className="flex justify-end gap-3">
          <Button
            onClick={() => setDeleteModalOpen(false)}
            buttonType="outline"
            label="Cancel"
          />
          <Button
            onClick={confirmDelete}
            buttonType="primary"
            classNames="bg-red-600 hover:bg-red-700"
            label="Delete"
          />
        </div>
      </Modal>
    </>
  );
};

export default PostsPage;
