"use client"
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import useDataStore from "@/store/useDataStore";
import tokenManager from "@/api/tokenManager";
import { useRouter } from "next/navigation";

const schema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

const MOCK_USERS = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "editor", password: "editor123", role: "editor" },
];

const LoginPage = () => {
  const setUser = useDataStore((state) => state.setUser);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    const user = MOCK_USERS.find(
      (u) => u.username === data.username && u.password === data.password
    );

    if (!user) {
      toast.error("Invalid username or password");
      return;
    }

    setUser({ username: user.username, role: user.role as "admin" | "editor" });
    tokenManager.setUser({
      username: user.username,
      role: user.role as "admin" | "editor",
    });
    toast.success("Logged in successfully");
    router.push("/dashboard");
  };

  return (
    <div
      className={twMerge(
        "min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900"
      )}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={twMerge(
          "bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-sm"
        )}
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
          Login
        </h2>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700 dark:text-gray-300">
            Username
          </label>
          <input
            {...register("username")}
            className={twMerge(
              "w-full px-3 py-2 border rounded focus:outline-none focus:ring-2",
              errors.username
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400",
              "dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            )}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className={twMerge(
              "w-full px-3 py-2 border rounded focus:outline-none focus:ring-2",
              errors.password
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400",
              "dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            )}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
