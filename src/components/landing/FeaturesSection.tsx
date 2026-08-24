import { Tv, Monitor, MessageCircle, Users, Gamepad2, Zap } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getTranslations } from "@/i18n/server";

const features = [
  {
    icon: Tv,
    key: "syncMode",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    icon: Monitor,
    key: "streamMode",
    gradient: "from-pink-500 via-fuchsia-500 to-purple-500",
  },
  {
    icon: MessageCircle,
    key: "liveChat",
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
  },
  {
    icon: Users,
    key: "privateRooms",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    icon: Gamepad2,
    key: "gamesInRoom",
    gradient: "from-pink-500 via-fuchsia-500 to-purple-500",
  },
  {
    icon: Zap,
    key: "noInstall",
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
  },
];

const FeaturesSection = ({ locale }: { locale: Locale }) => {
  const t = getTranslations(locale, "features");

  return (
    <section id="features" className="landing-section">
      <div className="landing-shell relative z-10">
        {/* Section Header */}
        <div className="landing-section-heading">
          <h2 className="landing-section-title">
{t("title")}
          </h2>
          <p className="landing-section-copy">
{t("subtitle")}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.key}
              className="group relative flex h-full animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <article className="landing-card-surface relative flex w-full flex-col p-6">
                <div className={`landing-icon-block mb-4 bg-gradient-to-br ${feature.gradient}`}>
                  <feature.icon className="h-[21px] w-[21px] text-white" />
                </div>

                <h3 className="mb-2 font-parkinsans text-xl font-semibold tracking-tight text-white">
                  {t(feature.key)}
                </h3>
                <p className="text-[14.5px] leading-[1.65] text-white/68">
                  {t(`${feature.key}Copy`)}
                </p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
