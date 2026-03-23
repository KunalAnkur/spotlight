import type { ReactNode } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

interface SecondaryPageLayoutProps {
  children: ReactNode;
}

export default function SecondaryPageLayout({ children }: SecondaryPageLayoutProps) {
  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <main className="secondary-page-main">
        <div className="landing-shell relative z-10 secondary-page-stack">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
