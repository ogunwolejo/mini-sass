"use client";

import {NamedExoticComponent, memo} from "react";
import {HiBars3} from "react-icons/hi2";

import {useAppUIContext} from "@/context/app.settings";

import {IconButton} from "../icon.button";

const AppHeader: NamedExoticComponent = memo(() => {
  const {openDrawerHandler} = useAppUIContext();
  return (
    <header id="app_header" className="w-full h-12 bg-gray-400 fixed z-0">
      <div className="w-full flex justify-between items-center h-full">
        <div id="" className="">
          <IconButton
            icon={<HiBars3 className="size-6 lg:size-8" />}
            className="block md:hidden"
            onClick={openDrawerHandler}
          />
        </div>
        <div></div>
      </div>
    </header>
  );
});

AppHeader.displayName = "AppHeader";
export default AppHeader;
