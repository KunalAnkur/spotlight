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

      <div className="mx-auto max-w-4xl space-y-5 md:space-y-6">
        {sections.map((section) => (
          <section key={section.number} className="secondary-surface">
            <div className="flex flex-col gap-5 md:flex-row md:items-start">
              <div className={`secondary-icon-chip ${section.gradient}`}>
                <section.icon className="h-6 w-6" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="text-sm font-semibold text-white/38">{section.number}</span>
                  <h2 className="secondary-card-title text-xl md:text-2xl">{section.title}</h2>
                </div>

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

                {section.items.length ? (
                  <ul className="secondary-check-list mt-5">
                    {section.items.map((item) => (
                      <li key={item} className="secondary-check-item">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
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
