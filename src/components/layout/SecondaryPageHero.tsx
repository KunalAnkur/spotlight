import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface SecondaryPageHeroProps {
  icon: LucideIcon;
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  gradientClassName?: string;
}

export default function SecondaryPageHero({
  icon: Icon,
  title,
  meta,
  gradientClassName = "bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500",
}: SecondaryPageHeroProps) {
  return (
    <header className="secondary-page-hero">
      <div className="secondary-page-heading-row">
        <div className={`secondary-page-hero-icon ${gradientClassName}`}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="secondary-page-heading-copy">
          <h1 className="secondary-page-title">{title}</h1>
          {meta ? <p className="secondary-page-meta">{meta}</p> : null}
        </div>
      </div>
    </header>
  );
}
