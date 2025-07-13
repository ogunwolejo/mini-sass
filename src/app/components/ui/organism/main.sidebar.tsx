"use client";

import clsx from "clsx";
import {memo, NamedExoticComponent} from "react";

import MobileSideBarDrawer from "@/app/components/ui/atoms/drawer";
import SideBarMenu from "@/app/components/ui/atoms/sidebar/menu";
import {useAppUIContext} from "@/context/app.settings";
import {useMediaQuery} from "@/hooks/useMediaQuery";

const MainSidebar: NamedExoticComponent = memo(() => {
  const {sidebarCollapsed} = useAppUIContext();
  const isMobileScreenWidth = useMediaQuery("(max-width: 480px)");
  return (
    <RenderSideBar
      isMobile={isMobileScreenWidth}
      sidebarCollapsed={sidebarCollapsed}
    />
  );
});

MainSidebar.displayName = "MainSidebar";
export default MainSidebar;

type RenderSideBarProps = {
  isMobile: boolean;
  sidebarCollapsed: boolean;
};
const RenderSideBar: NamedExoticComponent<RenderSideBarProps> = memo(
  ({isMobile, sidebarCollapsed}) =>
    isMobile ? (
      <MobileSideBarDrawer />
    ) : (
      <aside
        id="main-sidebar"
        className={clsx(
          "fixed md:relative h-screen transition-all duration-300 ease-in-out -translate-x-full md:translate-x-0 border-gray-200 bg-background z-50 hidden md:block",
          sidebarCollapsed ? "w-20" : "w-64",
        )}
      >
        <SideBarMenu />
      </aside>
    ),
);

RenderSideBar.displayName = "RenderSideBar";
