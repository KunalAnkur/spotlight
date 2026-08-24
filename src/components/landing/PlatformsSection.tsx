import { Globe, Monitor, Tv, Twitch, Video, Youtube, Film } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getTranslations } from "@/i18n/server";

interface PlatformEntry {
  name?: string;
  /** Descriptive labels are translated; brand names above are not. */
  nameKey?: string;
  icon: typeof Globe;
  surfaceClass: string;
  iconClass: string;
}

const platforms: PlatformEntry[] = [
  {
    name: "YouTube",
    icon: Youtube,
    surfaceClass: "bg-red-500/10",
    iconClass: "text-red-300",
  },
  {
    name: "Vimeo",
    icon: Film,
    surfaceClass: "bg-sky-500/10",
    iconClass: "text-sky-300",
  },
  {
    name: "Twitch",
    icon: Twitch,
    surfaceClass: "bg-violet-500/10",
    iconClass: "text-violet-300",
  },
  {
    nameKey: "screenShare",
    icon: Monitor,
    surfaceClass: "bg-rose-500/10",
    iconClass: "text-rose-300",
  },
  {
    nameKey: "localFiles",
    icon: Tv,
    surfaceClass: "bg-pink-500/10",
    iconClass: "text-pink-300",
  },
  {
    nameKey: "hlsStreams",
    icon: Video,
    surfaceClass: "bg-fuchsia-500/10",
    iconClass: "text-fuchsia-300",
  },
  {
    nameKey: "directUrls",
    icon: Globe,
    surfaceClass: "bg-white/[0.04]",
    iconClass: "text-white/78",
  },
];

const PlatformsSection = ({ locale }: { locale: Locale }) => {
  const t = getTranslations(locale, "platforms");

  return (
    <section id="platforms" className="landing-section">
      <div className="landing-shell relative z-10">
        <div className="landing-section-heading">
          <h2 className="landing-section-title">
            {t("title")}
          </h2>
          <p className="landing-section-copy">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {platforms.map((platform, index) => (
            <div
              key={platform.name ?? platform.nameKey}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <div className="flex h-full flex-col items-center justify-center gap-[11px] rounded-[20px] bg-white/[0.022] px-2.5 py-4 text-center">
                <div className={`flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[14px] ${platform.surfaceClass}`}>
                  <platform.icon className={`h-[19px] w-[19px] ${platform.iconClass}`} strokeWidth={2.1} />
                </div>

                <div className="min-w-0">
                  <div className="whitespace-nowrap font-parkinsans text-[13px] font-semibold tracking-tight text-white">
                    {platform.name ?? (platform.nameKey ? t(platform.nameKey) : "")}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-[22px] text-center text-sm leading-[1.6] text-white/50">
          {t("footnote")}
        </p>
      </div>
    </section>
  );
};

export default PlatformsSection;
