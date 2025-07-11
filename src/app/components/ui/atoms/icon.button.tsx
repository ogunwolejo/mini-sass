"use client";

import {memo, NamedExoticComponent, ReactNode} from "react";
import clsx from "clsx";
import {Button, ButtonProps} from "./button";

type IconPosition = "left" | "right";
interface IconButtonProps extends ButtonProps {
  icon: ReactNode;
  iconPosition?: IconPosition;
  iconClassName?: string;
}

export const IconButton: NamedExoticComponent<IconButtonProps> = memo(
  ({
    icon,
    iconPosition = "left",
    iconClassName = "",
    children,
    className,
    ...rest
  }) => {
    const iconElement = (
      <span
        className={clsx(
          "inline-flex items-center justify-center",
          children ? (iconPosition === "left" ? "mr-2" : "ml-2") : "",
          iconClassName,
        )}
      >
        {icon}
      </span>
    );

    return (
      <Button
        {...rest}
        className={clsx(
          "inline-flex items-center justify-center w-full cursor-pointer",
          className,
        )}
      >
        {iconPosition === "left" && iconElement}
        {children}
        {iconPosition === "right" && iconElement}
      </Button>
    );
  },
);

IconButton.displayName = "IconButton";
