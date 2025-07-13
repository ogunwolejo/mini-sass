"use client";

import {memo, NamedExoticComponent, useCallback} from "react";
import clsx from "clsx";
import {IconType} from "react-icons";
import Link from "next/link";
import {SideBarMenuLabel} from "@/app/components/ui/atoms/sidebar/menu.label";
import {usePathname} from "next/navigation";
import {useAppUIContext} from "@/context/app.settings";

type SidebarMenuItemsProps = {
  icon: IconType;
  label: string;
  href: string;
};

const SideBarMenuItems: NamedExoticComponent<SidebarMenuItemsProps> = memo(
  ({icon: Icon, label, href}) => {
    const {sidebarCollapsed} = useAppUIContext();
    const pathname = usePathname();
    const isActive = useCallback((path: string) => pathname === path);
    return (
      <li
        id="sidebar-menu-items"
        className={clsx(
          "p-3",
          isActive(href)
            ? "bg-gradient-to-r from-transparent to-teal/[0.85] border-none"
            : "border-none",
        )}
      >
        <Link
          href={href}
          className={clsx(
            "flex items-center gap-3",
              sidebarCollapsed ? "justify-center" : "justify-start",
          )}
        >
          <div
            id="icon-container"
            className={clsx(
              "size-9 rounded-xl flex justify-center items-center box-border",
              isActive(href) ? "bg-teal" : "bg-white",
            )}
          >
            <Icon
              className={clsx(
                "size-3 lg:size-4",
                isActive(href) ? "text-white" : "text-teal",
              )}
            />
          </div>
          <SideBarMenuLabel
            collapsed={sidebarCollapsed}
            content={label}
            isActive={isActive(href)}
          />
        </Link>
      </li>
    );
  },
);

SideBarMenuItems.displayName = "SideBarMenuItems";
export default SideBarMenuItems;
