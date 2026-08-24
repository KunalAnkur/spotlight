"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { LOCALE_COOKIE, languageNames, locales, type Locale } from "@/i18n/config";

interface LanguageSwitcherProps {
  locale: Locale;
  className?: string;
  /** Label for the trigger's accessible name, already translated by the caller. */
  label: string;
}

export default function LanguageSwitcher({ locale, className, label }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // The locale lives in a cookie the middleware reads, and the URL never changes — so a
  // full reload is what applies the new language, the new dir attribute, and the server
  // render of the translated copy. Cookie is shared with app.movmash.com's NEXT_LOCALE so
  // the language follows the visitor across the two apps.
  const choose = (next: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=31536000;samesite=lax`;
    window.location.reload();
  };

  const active = languageNames[locale];

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        className="inline-flex items-center gap-2 rounded-[10px] px-2.5 py-2 font-parkinsans text-[13px] font-medium text-white/72 transition-colors hover:text-white"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{active.nativeName}</span>
        <span className="sm:hidden">{locale.toUpperCase()}</span>
      </button>

      {open ? (
        <div
          role="listbox"
          aria-label={label}
          className="absolute end-0 z-50 mt-2 min-w-[168px] overflow-hidden rounded-[14px] border border-white/[0.08] bg-[#0c0b0f]/[0.97] py-1.5 shadow-[0_18px_44px_rgba(0,0,0,0.42)] backdrop-blur-[16px]"
        >
          {locales.map((option) => (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={option === locale}
              lang={option}
              dir={option === "ar" ? "rtl" : "ltr"}
              onClick={() => choose(option)}
              className={cn(
                "flex w-full items-center gap-2.5 px-3.5 py-2.5 text-start text-sm transition-colors hover:bg-white/[0.05]",
                option === locale ? "text-white" : "text-white/68",
              )}
            >
              <span aria-hidden="true">{languageNames[option].flag}</span>
              <span className="flex-1">{languageNames[option].nativeName}</span>
              {option === locale ? <Check className="h-3.5 w-3.5" /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
