import { cn } from "@/lib/utils";
import { dirFor, languageNames, locales, localizePath, type Locale } from "@/i18n/config";
import type { LanguagePaths } from "@/lib/metadata";

interface BlogLanguagesProps {
  /** The language of the blog being read. */
  current: Locale;
  /** The languages that have a blog, as `blogLanguagePaths` reports them. */
  blogs: LanguagePaths;
  /** The row's accessible name, already translated by the caller. */
  label: string;
  /** The tag on a language nothing has been published in yet, already translated. */
  soon: string;
  className?: string;
}

/** The same pill the legal page's tabs use, a little taller on a phone so it is easy to tap. */
const pill =
  "inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2 font-parkinsans text-sm font-semibold tracking-tight transition-all duration-200 md:min-h-0 md:text-[15px]";

/**
 * The blog in each language, as a row of pills.
 *
 * Every language's blog is an address of its own (/blog, /tr/blog…), so choosing one is an
 * ordinary link rather than a filter: the reader lands on that blog, and a crawler can take
 * the same path. A language with nothing published is shown but cannot be chosen — the
 * alternative is a link to an empty page — and turns into a link by itself on the day its
 * first post is published.
 *
 * Plain anchors, like the language menu: a full load is what swaps lang and dir on <html>.
 */
export default function BlogLanguages({ current, blogs, label, soon, className }: BlogLanguagesProps) {
  return (
    <nav
      id="blog-languages"
      aria-label={label}
      className={cn("flex flex-wrap items-center justify-center gap-2.5 md:justify-start", className)}
    >
      {locales.map((language) => {
        const name = languageNames[language].nativeName;
        // A language's name is written in that language, whatever the page around it is.
        const own = { lang: language, dir: dirFor(language) };

        if (language === current) {
          return (
            <span
              key={language}
              {...own}
              aria-current="page"
              className={cn(pill, "bg-white/[0.06] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]")}
            >
              {name}
            </span>
          );
        }

        if (!blogs[language]) {
          return (
            <span key={language} {...own} aria-disabled="true" className={cn(pill, "bg-white/[0.02] text-white/30")}>
              {/* The space is for whoever hears this read out; the gap is what is seen. */}
              {name}{" "}
              <span lang={current} dir={dirFor(current)} className="text-xs font-medium">
                {soon}
              </span>
            </span>
          );
        }

        return (
          <a
            key={language}
            {...own}
            href={localizePath(language, "/blog")}
            hrefLang={language}
            className={cn(pill, "bg-white/[0.02] text-white/56 hover:bg-white/[0.04] hover:text-white/82")}
          >
            {name}
          </a>
        );
      })}
    </nav>
  );
}
