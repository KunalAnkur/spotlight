"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Check, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  dirFor,
  languageNames,
  locales,
  localizePath,
  stripLocale,
  type Locale,
} from "@/i18n/config";
import type { LanguagePaths } from "@/lib/metadata";

interface LanguageSwitcherProps {
  locale: Locale;
  className?: string;
  /** Label for the trigger's accessible name, already translated by the caller. */
  label: string;
  /**
   * Where each language leads, for a page whose address differs per language (a blog post).
   * Left out, every language leads to the same path as the current page.
   */
  paths?: LanguagePaths;
}

export default function LanguageSwitcher({ locale, className, label, paths }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  // The page being read, without its language, so every option leads to that same page.
  const path = stripLocale(usePathname());

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const active = languageNames[locale];

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={label}
        className="inline-flex items-center gap-2 rounded-[10px] px-2.5 py-2 font-parkinsans text-[13px] font-medium text-white/72 transition-colors hover:text-white"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{active.nativeName}</span>
        <span className="sm:hidden">{locale.toUpperCase()}</span>
      </button>

      {/* Each language is an address of its own, so these are ordinary links — and they stay
          in the HTML while the menu is closed, which gives crawlers a path to every language.
          Plain anchors rather than <Link>: a full load is what swaps lang and dir on <html>. */}
      <div
        hidden={!open}
        className="absolute end-0 z-50 mt-2 min-w-[168px] overflow-hidden rounded-[14px] border border-white/[0.08] bg-[#0c0b0f]/[0.97] py-1.5 shadow-[0_18px_44px_rgba(0,0,0,0.42)] backdrop-blur-[16px]"
      >
        {locales.map((option) => (
          <a
            key={option}
            href={localizePath(option, paths?.[option] ?? path)}
            hrefLang={option}
            lang={option}
            dir={dirFor(option)}
            aria-current={option === locale ? "true" : undefined}
            className={cn(
              "flex w-full items-center gap-2.5 px-3.5 py-2.5 text-start text-sm transition-colors hover:bg-white/[0.05]",
              option === locale ? "text-white" : "text-white/68",
            )}
          >
            <span aria-hidden="true">{languageNames[option].flag}</span>
            <span className="flex-1">{languageNames[option].nativeName}</span>
            {option === locale ? <Check className="h-3.5 w-3.5" /> : null}
          </a>
        ))}
      </div>
    </div>
  );
}
