import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import SecondaryPageLayout from "@/components/layout/SecondaryPageLayout";
import SecondaryPageHero from "@/components/layout/SecondaryPageHero";

interface PolicySection {
  icon: LucideIcon;
  number: string;
  title: string;
  description: string;
  items: string[];
  gradient: string;
  email?: string;
}

interface SecondaryPolicyPageProps {
  icon: LucideIcon;
  title: ReactNode;
  description: ReactNode;
  updatedLabel?: string;
  sections: PolicySection[];
  note?: ReactNode;
  noteIcon?: LucideIcon;
}

export default function SecondaryPolicyPage({
  icon,
  title,
  description,
  updatedLabel,
  sections,
  note,
  noteIcon: NoteIcon,
}: SecondaryPolicyPageProps) {
  return (
    <SecondaryPageLayout>
      <SecondaryPageHero
        icon={icon}
        title={title}
        description={description}
        meta={updatedLabel}
      />

      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
        {sections.map((section) => (
          <section key={section.number} className="secondary-surface h-full">
            <div className="flex h-full flex-col gap-5">
              <div className="flex items-start justify-between gap-4">
                <div className={`secondary-icon-chip ${section.gradient}`}>
                  <section.icon className="h-6 w-6" />
                </div>
                <div className="text-xs font-semibold tracking-[0.28em] text-white/28">
                  {section.number.padStart(2, "0")}
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="secondary-card-title text-[1.24rem] md:text-[1.38rem]">
                  {section.title}
                </h2>

                <p className="secondary-card-copy">
                  {section.description}
                  {section.email ? (
                    <>
                      {" "}
                      <a href={`mailto:${section.email}`} className="secondary-inline-link">
                        {section.email}
                      </a>
                    </>
                  ) : null}
                </p>
              </div>

              {section.items.length ? (
                <ul className="secondary-check-list">
                  {section.items.map((item) => (
                    <li key={item} className="secondary-check-item">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        ))}
      </div>

      {note && NoteIcon ? (
        <div className="text-center">
          <div className="secondary-note-pill">
            <NoteIcon className="h-5 w-5 flex-shrink-0 text-rose-400" />
            <span>{note}</span>
          </div>
        </div>
      ) : null}
    </SecondaryPageLayout>
  );
}
