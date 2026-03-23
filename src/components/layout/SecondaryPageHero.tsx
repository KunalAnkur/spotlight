import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface SecondaryPageHeroProps {
  icon: LucideIcon;
  title: ReactNode;
  description: ReactNode;
  meta?: ReactNode;
  gradientClassName?: string;
}

export default function SecondaryPageHero({
  icon: Icon,
  title,
  description,
  meta,
  gradientClassName = "bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500",
}: SecondaryPageHeroProps) {
  return (
    <header className="secondary-page-hero">
      <div className={`secondary-page-hero-icon ${gradientClassName}`}>
        <Icon className="h-6 w-6 md:h-7 md:w-7" />
      </div>
      <h1 className="secondary-page-title">{title}</h1>
      {meta ? <p className="secondary-page-meta">{meta}</p> : null}
      <p className="secondary-page-copy">{description}</p>
    </header>
  );
}
