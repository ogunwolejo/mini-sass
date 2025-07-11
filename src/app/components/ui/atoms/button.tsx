"use client";

import {memo, NamedExoticComponent, ButtonHTMLAttributes} from "react";
import clsx from "clsx";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
export const Button: NamedExoticComponent<ButtonProps> = memo(
  ({className, children, ...rest}) => (
    <button
      {...rest}
      className={clsx(
        "inline-flex justify-center items-center font-helvetica w-full",
        className,
      )}
    >
      {children}
    </button>
  ),
);

Button.displayName = "Button";
