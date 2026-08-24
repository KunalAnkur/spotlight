import PricingPlansGrid from "@/components/pricing/PricingPlansGrid";
import type { Locale } from "@/i18n/config";
import { getTranslations } from "@/i18n/server";

const PricingPreviewSection = ({ locale }: { locale: Locale }) => {
  const t = getTranslations(locale, "pricingPreview");
  const tp = getTranslations(locale, "pricing");

  return (
    <section id="pricing" className="landing-section">
      <div className="landing-shell relative z-10">
        <div className="landing-section-heading">
          <p className="landing-kicker">{t("kicker")}</p>
          <h2 className="landing-section-title">{t("title")}</h2>
          <p className="landing-section-copy">
            {tp("subtitle")}
          </p>
        </div>

        <PricingPlansGrid />
      </div>
    </section>
  );
};

export default PricingPreviewSection;
