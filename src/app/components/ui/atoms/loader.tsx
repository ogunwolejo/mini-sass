"use client";

import {memo, NamedExoticComponent} from "react";
import clsx from "clsx";

export type SpinnerProps = {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  color?: string;
  className?: string;
  borderWidth?: number;
};

export const Spinner: NamedExoticComponent<SpinnerProps> = memo(
  ({size = "md", color = "text-teal", className, borderWidth = 2}) => {
    const getSizeClasses = () => {
      if (typeof size === "number") {
        return `h-${size} w-${size}`;
      }
      switch (size) {
        case "xs":
          return "h-4 w-4";
        case "sm":
          return "h-6 w-6";
        case "md":
          return "h-8 w-8";
        case "lg":
          return "h-10 w-10";
        case "xl":
          return "h-12 w-12";
        default:
          return "h-8 w-8";
      }
    };

    return (
      <div
        className={clsx(
          "inline-block animate-spin rounded-full",
          color,
          getSizeClasses(),
          className,
        )}
        style={{
          borderWidth: `${borderWidth}px`,
          borderTopColor: "transparent",
          borderRightColor: "currentColor",
          borderBottomColor: "currentColor",
          borderLeftColor: "currentColor",
        }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  },
);

Spinner.displayName = "Spinner";
