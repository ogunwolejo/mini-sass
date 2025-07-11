"use client";
import clsx from "clsx";
import {NamedExoticComponent, memo, LabelHTMLAttributes} from "react";

type Props = LabelHTMLAttributes<HTMLLabelElement>;
export const Label: NamedExoticComponent<Props> = memo((props) => (
  <label
    {...props}
    className={clsx(
      "text-gray700 text-sm lg:text-sm font-normal font-helvetica",
      props.className,
    )}
  >
    {props.children}
  </label>
));

Label.displayName = "Label";
