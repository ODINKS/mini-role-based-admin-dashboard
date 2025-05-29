"use client";
import Button from "@/components/global/Button";
import Navbar from "@/components/global/Navbar";
import { useBreakpoint } from "@/hooks/UseBreakPoint";
import { twMerge } from "tailwind-merge";

export default function Home() {
  const { isXsOnly } = useBreakpoint();
  return (
    <section
      className={twMerge(
        "h-screen w-full flex items-center justify-center bg-blur-lg bg-black/50",
        "dark:bg-gray-900 dark:bg-opacity-90 overflow-y-auto",
        isXsOnly ? "pt-32 pb-6" : ""
      )}
    >
      <Navbar />
      <div
        className="
          w-full max-w-[400px] rounded-lg shadow-lg p-8 text-center
          bg-white text-black
          dark:bg-gray-900 dark:text-gray-200
        "
      >
        <h1 className="text-3xl font-semibold text-blue-500 mb-6">
          Welcome to Dashboard Analytics
        </h1>
        <p className="text-lg text-gray-700 mb-6 dark:text-gray-300">
          Get insights and track your progress in the dashboard.
        </p>
        <Button label="Go to Login" link="/login" />
      </div>
    </section>
  );
}
