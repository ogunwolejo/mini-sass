"use client";

import {memo, NamedExoticComponent} from "react";
import {IoHome} from "react-icons/io5";
import Image from "next/image";

import SideBarMenuItems from "@/app/components/ui/atoms/sidebar/menu.items";
import {useAppUIContext} from "@/context/app.settings";

const MobileMenu: NamedExoticComponent = memo(() => {
  const {mobileDrawer} = useAppUIContext();
  return (
    <div
      id="mobile-menu-container"
      className="flex-1 h-full w-full py-2 flex-col justify-start border-r border-gray-200"
    >
      <div className="p-2 mt-4 relative">
        <Image
          src="/logo.svg"
          alt="app-logo"
          width={150}
          height={100}
          priority
        />
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

MobileMenu.displayName = "MobileMenu";
export default MobileMenu;
