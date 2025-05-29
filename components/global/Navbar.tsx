"use client";
import React from "react";
import Link from "next/link";
import DarkModeToggle from "@/components/global/DarkModeToggle";
import { twMerge } from "tailwind-merge";

const Navbar: React.FC = () => {
  
  return (
    <nav
      className={twMerge(
        "flex fixed top-0 inset-x-0 items-center justify-between px-6 py-4 border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700"
      )}
    >
      <Link
        href="/"
        className={twMerge(
          "text-blue-600 dark:text-blue-400 font-bold text-2xl select-none"
        )}
      >
        Nicklytics
      </Link>
      <div className="mr-10">
        <DarkModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
