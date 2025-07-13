"use client";

import clsx from "clsx";
import {Fragment, NamedExoticComponent, memo} from "react";

import MobileMenu from "@/app/components/ui/atoms/drawer/mobile.menu";
import {useAppUIContext} from "@/context/app.settings";

const MobileSideBarDrawer: NamedExoticComponent = memo(() => {
  const {mobileDrawer, closeDrawerHandler} = useAppUIContext();
  return (
    <Fragment>
      <div
        className={clsx(
          "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300",
          mobileDrawer ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={closeDrawerHandler}
      />

      <aside
        id="mobile-drawer"
        className={clsx(
          "fixed top-0 left-0 h-screen z-50 bg-background transition-transform duration-300 border-r border-gray-200 w-64",
          mobileDrawer ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <MobileMenu />
      </aside>
    </Fragment>
  );
});

MobileSideBarDrawer.displayName = "MobileSideBarDrawer";
export default MobileSideBarDrawer;
