"use client";

import Footer from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import FadeIn from "@/components/ui/FadeIn";
import { usePathname } from "next/navigation";

// routes where not to show footer
const noFooterRoutes = ["/login", "/register"];

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showFooter = !noFooterRoutes.includes(pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex-1">
        <FadeIn>
          <div className="mt-[120px] w-4/5 mx-auto">{children}</div>
        </FadeIn>
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
