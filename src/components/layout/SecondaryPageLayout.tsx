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
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(244,63,94,0.12),transparent_58%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-12 h-px bg-white/6" />
        <div className="landing-shell relative z-10 secondary-page-stack">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
