import React from "react";

interface SpinnerProps {
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ className }) => {
  return (
    <div
      className={`w-5 h-5 border-3 border-t-transparent rounded-full animate-spin border-blue-500 dark:border-blue-300 ${className}`}
    ></div>
  );
};

export default Spinner;
