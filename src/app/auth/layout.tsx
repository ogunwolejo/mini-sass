import {ReactNode} from "react";

import Footer from "@/app/components/ui/atoms/footer";

export default async function AuthLayout({
  children,
}: Readonly<{children: ReactNode}>) {
  return (
    <div id="auth_layout_container" className="w-full h-screen">
      {children}
      <Footer />
    </div>
  );
}
