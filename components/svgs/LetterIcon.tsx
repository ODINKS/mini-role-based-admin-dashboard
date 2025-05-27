import React from "react";
import { twMerge } from "tailwind-merge";

function LetterIcon({ className }: { className?: string }) {
  return (
    <svg
      width="{24}"
      height="{24}"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge("w-6 h-6",className)}
    >
      <path
        d="M4.20039 6.60005L11.3173 11.5272C11.7283 11.8117 12.2725 11.8117 12.6834 11.5272L19.8004 6.60005M4.80039 19.2H19.2004C20.5259 19.2 21.6004 18.1255 21.6004 16.8V7.20005C21.6004 5.87457 20.5259 4.80005 19.2004 4.80005H4.80039C3.47491 4.80005 2.40039 5.87457 2.40039 7.20005V16.8C2.40039 18.1255 3.47491 19.2 4.80039 19.2Z"
        stroke="#2C2C2C"
        strokeWidth="{2}"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default LetterIcon;
