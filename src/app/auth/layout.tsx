import Footer from "@/app/components/ui/atoms/footer";
import {ReactNode} from "react";

export default function AuthLayout({
  children,
}: Readonly<{children: ReactNode}>) {
  return (
    <div id="auth_layout_container" className="w-full h-screen">
      {children}
      <Footer />
    </div>
  );
}
