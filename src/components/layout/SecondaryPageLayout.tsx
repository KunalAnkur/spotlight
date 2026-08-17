import type { ReactNode } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { cn } from "@/lib/utils";

interface SecondaryPageLayoutProps {
  children: ReactNode;
  mainClassName?: string;
}

export default function SecondaryPageLayout({
  children,
  mainClassName,
}: SecondaryPageLayoutProps) {
  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <main className={cn("secondary-page-main", mainClassName)}>
        <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-[32rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.10)_0%,rgba(244,63,94,0.05)_34%,transparent_76%)] blur-[56px] md:h-44 md:w-[46rem]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(244,63,94,0.03)_0%,transparent_100%)]" />
        {/* No hairline of its own here: the navbar owns that line and only fades it in once
            you have scrolled, so a second static one just sits under the bar on arrival. */}
        <div className="landing-shell relative z-10 secondary-page-stack">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
