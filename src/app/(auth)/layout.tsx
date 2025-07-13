import {ReactNode} from "react";

import Footer from "@/app/components/ui/atoms/footer";
import AppHeader from "@/app/components/ui/atoms/navbars/header";
import MainSidebar from "@/app/components/ui/organism/main.sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{children: ReactNode}>) {
  return (
    <div
      id="dashboard_layout_container"
      className="w-full h-screen flex overflow-hidden w-full"
    >
      <MainSidebar />
      <main
        id="main_container"
        className="flex-1 overflow-y-auto box-border flex-col justify-start"
      >
        <AppHeader />
        {children}
      </main>
      <Footer />
    </div>
  );
}
