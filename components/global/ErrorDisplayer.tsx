import React from "react";
import { twMerge } from "tailwind-merge";

function ErrorDisplayer({
  error,
  className,
}: {
  error?: string;
  className?: string;
}) {
  return (
    <>
      {error && (
        <p
          className={twMerge(
            "text-red-500 dark:text-red-400 text-xs mt-1",
            className
          )}
        >
          {error}
        </p>
      )}
    </>
  );
}

export default ErrorDisplayer;
