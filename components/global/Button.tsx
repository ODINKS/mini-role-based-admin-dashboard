"use client";

import React from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import Spinner from "./Spinner";

// Shared base props
type BaseButtonProps = {
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  classNames?: string;
  link?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disableHover?: boolean;
  buttonType?: "primary" | "outline" | "onlyIcon" | "ghost";
  isGray?: boolean;
};

type ButtonWithLabel = BaseButtonProps & {
  onlyIcon?: false;
  label: string | React.ReactNode;
};

type ButtonOnlyIcon = BaseButtonProps & {
  onlyIcon: true;
  label?: never;
};

// Final prop type
type ButtonProps = ButtonWithLabel | ButtonOnlyIcon;

const Button: React.FC<ButtonProps> = ({
  label,
  isLoading = false,
  isDisabled = false,
  onClick,
  classNames,
  link,
  leftIcon,
  rightIcon,
  type = "button",
  disableHover,
  buttonType = "primary",
  onlyIcon = false,
}) => {
  const content = isLoading ? <Spinner /> : onlyIcon ? null : label;

  const shouldDisable = isLoading || isDisabled;

  const hoverStyles = disableHover
    ? ""
    : `transition ease-in-out duration-300 hover:opacity-60`;

  const baseStyles = [
    `flex justify-center text-sm items-center gap-2 rounded-small border font-semibold w-full py-[0.875rem] px-4 cursor-pointer`,
    hoverStyles,
  ];

  const buttonTypeStyles: Record<string, string> = {
    primary: "bg-blue-500 text-white border-transparent hover:bg-blue-600", // Blue primary button
    outline:
      "bg-transparent text-blue-500 border border-blue-500 rounded-[0.93rem] hover:bg-blue-100 dark:hover:bg-blue-700", // Blue outline button
    ghost:
      "bg-transparent text-blue-500 w-auto border-transparent !p-0 hover:bg-blue-100 dark:hover:bg-blue-700", // Transparent ghost button
    onlyIcon: "!w-fit !h-fit bg-transparent !p-0 sm:!p-0 border-transparent", // Icon-only button
  };

  const mergedClassNames = twMerge(
    [
      ...baseStyles,
      buttonTypeStyles[buttonType] ?? "",
      classNames,
      isDisabled ? "bg-gray-200 cursor-not-allowed" : "",
    ].join(" ")
  );

  const buttonContent = (
    <>
      {leftIcon && <span>{leftIcon}</span>}
      {content}
      {rightIcon && <span>{rightIcon}</span>}
    </>
  );

  if (link) {
    return (
      <Link href={link} passHref className={mergedClassNames} onClick={onClick}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={mergedClassNames}
      onClick={onClick}
      disabled={shouldDisable}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
