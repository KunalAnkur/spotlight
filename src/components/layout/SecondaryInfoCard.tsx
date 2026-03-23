import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SecondaryInfoCardProps {
  icon: LucideIcon;
  title: string;
  description: ReactNode;
  gradientClassName: string;
  footer?: ReactNode;
  className?: string;
}

export default function SecondaryInfoCard({
  icon: Icon,
  title,
  description,
  gradientClassName,
  footer,
  className,
}: SecondaryInfoCardProps) {
  return (
    <article className={cn("secondary-surface h-full", className)}>
      <div className={`secondary-icon-chip ${gradientClassName}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="mt-5 space-y-3">
        <h2 className="secondary-card-title">{title}</h2>
        <div className="secondary-card-copy">{description}</div>
      </div>
      {footer ? <div className="mt-5">{footer}</div> : null}
    </article>
  );
}
