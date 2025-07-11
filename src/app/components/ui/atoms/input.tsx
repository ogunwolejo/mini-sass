"use client";

import {
  memo,
  NamedExoticComponent,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import clsx from "clsx";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode;
  iconClassName?: string;
};

export const Input: NamedExoticComponent<Props> = memo(
  ({className, type, icon, iconClassName = "", ...rest}) => (
    <div
      id={rest.id}
      className={clsx(
        "w-full rounded-xl border border-gray-300 min-h-[50px] min-w-[350px]",
        "flex items-center px-3 py-1.5 font-helvetica",
        "focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500",
        "transition-colors duration-200",
        className,
      )}
    >
      <input
        type={type}
        className={clsx(
          "w-full border-none outline-none ring-0",
          "placeholder:font-helvetica placeholder:text-sm",
          "placeholder:text-gray-400 placeholder:font-normal",
          "text-sm text-gray-700 bg-transparent",
        )}
        {...rest}
      />

      {icon && (
        <span className={clsx("ml-2 text-gray-400", iconClassName)}>
          {icon}
        </span>
      )}
    </div>
  ),
);

Input.displayName = "Input";
