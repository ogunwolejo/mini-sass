// Use this context to save things like collapsed state of the sidebar, user selected theme and more
"use client";

import {
  Context,
  createContext,
  PropsWithChildren,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

import {Theme} from "@/lib/constants";
import {getLocalStorageValue, setLocalStorageValue} from "@/lib/local.storage";
type TAppUIContext = {
  theme: "light" | "dark" | undefined;
  sidebarCollapsed: boolean;
  mobileDrawer: boolean;
  handleChangeTheme: (s: "light" | "dark") => void;
  collapseSidebarHandler: () => void;
  unCollapseSidebarHandler: () => void;
  openDrawerHandler: () => void;
  closeDrawerHandler: () => void;
};

const AppUIContext: Context<TAppUIContext> = createContext({
  sidebarCollapsed: false,
  theme: "light",
  mobileDrawer: false,
});

export const useAppUIContext = () => {
  return useContext(AppUIContext);
};

export const AppUIContextProvider = ({children}: PropsWithChildren) => {
  const [sideBarCollapsed, setSideBarCollapsed] =
    useState<Pick<TAppUIContext, "sidebarCollapsed">>(false);
  const [appTheme, setAppTheme] =
    useState<Pick<TAppUIContext, "theme">>(undefined);
  const [mobileDrawer, setMobileDrawer] = useState<boolean>(false);

  // use the layout effect to get the theme in the local storage
  useLayoutEffect(() => {
    const thm = getLocalStorageValue<string>(Theme);
    if (!thm) {
      setAppTheme("light");
    } else {
      setAppTheme(thm);
    }
  }, []);

  const handleChangeAppTheme = (selectedTheme: "light" | "dark"): void => {
    setLocalStorageValue<string>(selectedTheme); // save it in the local storage
    setAppTheme(selectedTheme);
  };
  const collapseSidebarHandler = (): void => {
    setSideBarCollapsed(true);
  };
  const unCollapseSidebarHandler = (): void => {
    setSideBarCollapsed(false);
  };

  // mobile drawer
  const handleOpenDrawer = (): void => {
    setMobileDrawer(true);
  };
  const handleCloseDrawer = (): void => {
    setMobileDrawer(false);
  };

  return (
    <AppUIContext.Provider
      value={{
        sidebarCollapsed: sideBarCollapsed,
        theme: appTheme,
        mobileDrawer: mobileDrawer,
        collapseSidebarHandler,
        unCollapseSidebarHandler,
        handleChangeTheme: handleChangeAppTheme,
        closeDrawerHandler: handleCloseDrawer,
        openDrawerHandler: handleOpenDrawer,
      }}
    >
      {children}
    </AppUIContext.Provider>
  );
};
