"use client";

import {NamedExoticComponent, memo} from "react";
import {Label} from "@/app/components/ui/atoms/label";
import clsx from "clsx";

type SideBarMenuLabelProps = {
  collapsed: boolean;
  content: string;
  isActive: boolean;
};

export const SideBarMenuLabel: NamedExoticComponent<SideBarMenuLabelProps> =
  memo(({collapsed, content, isActive}) =>
    !collapsed ? (
      <Label
        className={clsx(
          "capitalize font-semibold ",
          isActive ? "text-gray700" : "text-gray-400",
        )}
      >
        {content}
      </Label>
    ) : null,
  );
SideBarMenuLabel.displayName = "SideBarMenuLabel";
