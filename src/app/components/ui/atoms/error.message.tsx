"use client";

import {memo, NamedExoticComponent} from "react";

export const ErrorMessage: NamedExoticComponent<{message: string}> = memo(
  ({message}) => (
    <p className="w-full text-sm text-red-700 font-bold font-helvetica">
      {message}
    </p>
  ),
);

ErrorMessage.displayName = "ErrorMessage";
