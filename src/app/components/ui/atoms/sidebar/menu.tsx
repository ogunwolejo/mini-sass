"use client";

import {memo, NamedExoticComponent} from "react";
import {IoHome} from "react-icons/io5";
import Image from "next/image";
import {FaChevronRight, FaChevronLeft} from "react-icons/fa";

import {IconButton} from "@/app/components/ui/atoms/icon.button";
import SideBarMenuItems from "@/app/components/ui/atoms/sidebar/menu.items";
import {useAppUIContext} from "@/context/app.settings";

const SideBarMenu: NamedExoticComponent = memo(() => {
  const {sidebarCollapsed, collapseSidebarHandler, unCollapseSidebarHandler} =
    useAppUIContext();
  return (
    <div
      id="sidebar-menu-container"
      className="flex-1 h-full w-full py-2 flex-col justify-start border-r border-gray-200"
    >
      <div className="p-2 mt-4 relative">
        <Image
          src="/logo.svg"
          alt="app-logo"
          className={sidebarCollapsed ? "hidden" : ""}
          width={150}
          height={100}
          priority
        />

        <div
          id="collapse-toggle-btn"
          className="flex justify-center items-center shadow-lg z-40 size-8 bg-white rounded-full absolute right-[-20] p-2 top-0"
        >
          <IconButton
            onClick={
              sidebarCollapsed
                ? unCollapseSidebarHandler
                : collapseSidebarHandler
            }
            icon={
              sidebarCollapsed ? (
                <FaChevronRight className="size-4 text-teal" />
              ) : (
                <FaChevronLeft className="size-4 text-teal" />
              )
            }
          />
        </div>
      </div>
      <nav className="py-4">
        <ul className="space-y-4">
          <SideBarMenuItems icon={IoHome} label="dashboard" href="/dashboard" />
          <SideBarMenuItems
            icon={IoHome}
            label="setting"
            href="/dashboard/setting"
          />
        </ul>
      </nav>
    </div>
  );
});

SideBarMenu.displayName = "SideBarMenu";
export default SideBarMenu;
