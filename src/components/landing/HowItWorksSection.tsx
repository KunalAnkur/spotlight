import { Link, Play, Share2 } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getTranslations } from "@/i18n/server";

const steps = [
  {
    number: "01",
    icon: Link,
    key: "step1",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    number: "02",
    icon: Share2,
    key: "step2",
    gradient: "from-pink-500 via-fuchsia-500 to-purple-500",
  },
  {
    number: "03",
    icon: Play,
    key: "step3",
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
  },
];

const HowItWorksSection = ({ locale }: { locale: Locale }) => {
  const t = getTranslations(locale, "howItWorks");

  return (
    <section id="how-it-works" className="landing-section">
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

        {/* Steps */}
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.number}
              className="landing-card-surface flex h-full animate-slide-up flex-col p-[26px]"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="mb-[22px] flex items-center justify-between">
                <div className={`landing-icon-block-lg bg-gradient-to-br ${step.gradient}`}>
                  <step.icon className="h-[25px] w-[25px] text-white" />
                </div>

                <div className="bg-gradient-to-br from-[#f43f5e] via-[#ec4899] to-[#d946ef] bg-clip-text font-parkinsans text-[30px] font-semibold leading-none tracking-[-0.03em] text-transparent opacity-70">
                  {step.number}
                </div>
              </div>

              <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-white/48">
                {t("stepLabel")} {step.number}
              </span>
              <h3 className="mb-2 font-parkinsans text-xl font-semibold tracking-tight text-white">
                {t(step.key)}
              </h3>
              <p className="text-[14.5px] leading-[1.65] text-white/68">
                {t(`${step.key}Copy`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
