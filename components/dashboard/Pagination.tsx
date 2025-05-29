"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = [];

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav
      aria-label="Pagination Navigation"
      className="flex justify-center mt-8 space-x-2 select-none"
    >
      {/* Previous button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={twMerge(
          "px-3 py-1 rounded-md font-semibold transition",
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed dark:text-gray-600"
            : "text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-blue-400 dark:hover:bg-blue-700 dark:focus:ring-blue-500"
        )}
        aria-label="Previous page"
      >
        &laquo;
      </button>

      {/* First page */}
      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-1 rounded-md font-semibold text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-blue-400 dark:hover:bg-blue-700 dark:focus:ring-blue-500"
            aria-label="Go to page 1"
          >
            1
          </button>
          {startPage > 2 && (
            <span className="px-2 py-1 dark:text-gray-400">…</span>
          )}
        </>
      )}

      {/* Page numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={twMerge(
            "px-3 py-1 rounded-md font-semibold transition focus:outline-none focus:ring-2",
            page === currentPage
              ? "bg-blue-600 text-white cursor-default dark:bg-blue-500"
              : "text-blue-600 hover:bg-blue-100 focus:ring-blue-400 dark:text-blue-400 dark:hover:bg-blue-700 dark:focus:ring-blue-500"
          )}
          aria-current={page === currentPage ? "page" : undefined}
          aria-label={`Go to page ${page}`}
        >
          {page}
        </button>
      ))}

      {/* Last page */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="px-2 py-1 dark:text-gray-400">…</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-1 rounded-md font-semibold text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-blue-400 dark:hover:bg-blue-700 dark:focus:ring-blue-500"
            aria-label={`Go to page ${totalPages}`}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={twMerge(
          "px-3 py-1 rounded-md font-semibold transition",
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed dark:text-gray-600"
            : "text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-blue-400 dark:hover:bg-blue-700 dark:focus:ring-blue-500"
        )}
        aria-label="Next page"
      >
        &raquo;
      </button>
    </nav>
  );
};

export default Pagination;
