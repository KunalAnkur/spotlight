import { Play } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getTranslations } from "@/i18n/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ctaEmojis = [
  {
    emoji: "✨",
    className: "-left-[56px] top-9",
    animationClass: "animate-float-subtle",
    delay: "0.14s",
    sizeClass: "text-[1.45rem]",
  },
  {
    emoji: "🫶",
    className: "-right-10 top-0",
    animationClass: "animate-float-gentle",
    delay: "0.28s",
    sizeClass: "text-[1.7rem]",
  },
  {
    emoji: "🎬",
    className: "-left-5 bottom-[60px]",
    animationClass: "animate-float",
    delay: "0.42s",
    sizeClass: "text-[1.6rem]",
  },
  {
    emoji: "💫",
    className: "right-0 bottom-11",
    animationClass: "animate-float-subtle",
    delay: "0.56s",
    sizeClass: "text-[1.5rem]",
  },
];

const CTASection = ({ locale }: { locale: Locale }) => {
  const t = getTranslations(locale, "cta");

  return (
    <section className="landing-section text-center">
      <div className="landing-shell relative z-10">
        <div className="relative mx-auto max-w-[820px]">
          <div className="pointer-events-none absolute inset-0 hidden xl:block">
            {ctaEmojis.map((item) => (
              <div
                key={`${item.emoji}-${item.className}`}
                aria-hidden="true"
                className={`absolute leading-none opacity-80 drop-shadow-[0_10px_18px_rgba(0,0,0,0.22)] ${item.sizeClass} ${item.className} ${item.animationClass}`}
                style={{ animationDelay: item.delay }}
              >
                <span>{item.emoji}</span>
              </div>
            ))}
          </div>

          <h2 className="landing-section-title mb-3.5">
            {t("title")}
          </h2>

          <p className="mx-auto mb-[26px] max-w-[520px] text-base text-white/68">
            {t("subtitle")}
          </p>

          <div className="flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <Button variant="hero" asChild className="font-parkinsans">
              <a href="https://app.movmash.com" target="_blank" rel="noopener noreferrer">
                <Play className="fill-current" strokeWidth={0} />
                {t("ctaPrimary")}
              </a>
            </Button>
            <Button variant="outline" asChild className="font-parkinsans">
              <Link href="/games">{t("ctaSecondary")}</Link>
            </Button>
          </div>

          <div className="landing-meta-line mt-6">
            <span className="inline-flex items-center gap-[9px]">
              <b className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#e11d48] from-[30%] via-[#db2777] via-[50%] to-[#c026d3]" />
              {t("signalPrivate")}
            </span>
            <span className="inline-flex items-center gap-[9px]">
              <b className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#e11d48] from-[30%] via-[#db2777] via-[50%] to-[#c026d3]" />
              {t("signalNoDownload")}
            </span>
            <span className="inline-flex items-center gap-[9px]">
              <b className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#e11d48] from-[30%] via-[#db2777] via-[50%] to-[#c026d3]" />
              {t("signalAllDevices")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
