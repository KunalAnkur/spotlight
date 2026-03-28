"use client";

import { startTransition, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Cookie,
  Copyright,
  Database,
  FileCheck,
  FileText,
  Info,
  Layers,
  Lock,
  Mail,
  Monitor,
  RefreshCw,
  Settings,
  Shield,
  Sliders,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { LegalIconKey, LegalPolicy, LegalPolicyKey } from "@/content/legal-policies";
import { cn } from "@/lib/utils";

interface LegalPoliciesTabsProps {
  initialTab: LegalPolicyKey;
  policies: LegalPolicy[];
}

function isLegalPolicyKey(value: string | null): value is LegalPolicyKey {
  return value === "privacy" || value === "terms" || value === "cookies";
}

const iconMap: Record<LegalIconKey, LucideIcon> = {
  "alert-circle": AlertCircle,
  "check-circle": CheckCircle2,
  cookie: Cookie,
  copyright: Copyright,
  database: Database,
  "file-check": FileCheck,
  "file-text": FileText,
  info: Info,
  layers: Layers,
  lock: Lock,
  mail: Mail,
  monitor: Monitor,
  refresh: RefreshCw,
  settings: Settings,
  shield: Shield,
  sliders: Sliders,
  "user-check": UserCheck,
  users: Users,
};

export default function LegalPoliciesTabs({
  initialTab,
  policies,
}: LegalPoliciesTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<LegalPolicyKey>(initialTab);
  const [activePanelHeight, setActivePanelHeight] = useState<number | null>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (isLegalPolicyKey(tab) && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [activeTab, searchParams]);

  const activeIndex = useMemo(
    () => Math.max(0, policies.findIndex((policy) => policy.key === activeTab)),
    [activeTab, policies]
  );

  const trackWidth = `${policies.length * 100}%`;
  const panelWidth = `${100 / policies.length}%`;
  const trackShift = `translateX(-${(activeIndex * 100) / policies.length}%)`;

  useLayoutEffect(() => {
    const activePanel = panelRefs.current[activeIndex];

    if (!activePanel) {
      return;
    }

    const updateHeight = () => {
      setActivePanelHeight(activePanel.offsetHeight);
    };

    updateHeight();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateHeight);
      return () => window.removeEventListener("resize", updateHeight);
    }

    const observer = new ResizeObserver(() => {
      updateHeight();
    });

    observer.observe(activePanel);

    return () => {
      observer.disconnect();
    };
  }, [activeIndex, policies]);

  const handleTabChange = (tab: LegalPolicyKey) => {
    if (tab === activeTab) {
      return;
    }

    setActiveTab(tab);

    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <section className="mx-auto w-full max-w-6xl space-y-6">
      <div
        className="flex w-full flex-wrap items-center justify-start gap-3"
        role="tablist"
        aria-label="Legal policies"
      >
        {policies.map((policy) => {
          const isActive = policy.key === activeTab;
          const PolicyIcon = iconMap[policy.icon];

          return (
            <button
              key={policy.key}
              type="button"
              onClick={() => handleTabChange(policy.key)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-left transition-all duration-200",
                isActive
                  ? "bg-white/[0.06] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                  : "bg-white/[0.02] text-white/56 hover:bg-white/[0.04] hover:text-white/82"
              )}
              role="tab"
              aria-selected={isActive}
            >
              <div
                className={cn(
                  "flex flex-shrink-0 items-center justify-center",
                  isActive ? "text-[#ffd3d8]" : "text-white/38"
                )}
              >
                <PolicyIcon className="h-4 w-4" />
              </div>
              <div className="font-parkinsans text-sm font-semibold tracking-tight md:text-[15px]">
                {policy.label}
              </div>
            </button>
          );
        })}
      </div>

      <div
        className="overflow-hidden transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={activePanelHeight ? { height: activePanelHeight } : undefined}
      >
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
          style={{ width: trackWidth, transform: trackShift }}
        >
          {policies.map((policy, index) => {
            const NoteIcon = policy.noteIcon ? iconMap[policy.noteIcon] : null;

            return (
              <div key={policy.key} className="flex-none px-1" style={{ width: panelWidth }}>
                <div
                  ref={(node) => {
                    panelRefs.current[index] = node;
                  }}
                  className="w-full max-w-5xl space-y-7"
                >
                  <div className="flex flex-col gap-8">
                    {policy.sections.map((section) => {
                      const SectionIcon = iconMap[section.icon];

                      return (
                        <section
                          key={`${policy.key}-${section.number}`}
                          className="grid grid-cols-[1rem_minmax(0,1fr)] items-start gap-4"
                        >
                          <div className="pt-1 text-[#ffd8dc]/70">
                            <SectionIcon className="h-4 w-4" />
                          </div>

                          <div className="min-w-0 space-y-2.5">
                            <h3 className="font-parkinsans text-[1.06rem] font-semibold leading-tight tracking-tight text-white md:text-[1.18rem]">
                              {section.title}
                            </h3>

                            <p className="secondary-card-copy max-w-[56ch]">
                              {section.description}
                              {section.email ? (
                                <>
                                  {" "}
                                  <a
                                    href={`mailto:${section.email}`}
                                    className="font-medium text-white/78 underline decoration-white/18 underline-offset-4 transition-colors hover:text-white"
                                  >
                                    {section.email}
                                  </a>
                                </>
                              ) : null}
                            </p>

                            {section.items.length ? (
                              <ul className="secondary-check-list pt-1">
                                {section.items.map((item) => (
                                  <li key={item} className="secondary-check-item">
                                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 flex-shrink-0 text-[#ffd8dc]/62" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                          </div>
                        </section>
                      );
                    })}
                  </div>

                  {policy.note && NoteIcon ? (
                    <div className="border-t border-white/6 pt-6">
                      <div className="flex max-w-[56ch] items-start gap-3 text-sm text-white/62">
                        <NoteIcon className="h-4.5 w-4.5 flex-shrink-0 text-[#ffd8dc]/68" />
                        <span>{policy.note}</span>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
