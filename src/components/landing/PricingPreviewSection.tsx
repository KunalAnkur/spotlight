import PricingPlansGrid from "@/components/pricing/PricingPlansGrid";

const PricingPreviewSection = () => {
  return (
    <section id="pricing" className="landing-section">
      <div className="landing-shell relative z-10">
        <div className="landing-section-heading">
          <p className="landing-kicker">Pricing</p>
          <h2 className="landing-section-title">Pick the room that fits the night.</h2>
          <p className="landing-section-copy">
            Start free for a quick watch, or move to Couple or Crowd for unlimited time,
            video calls and better quality. Games are on every plan.
          </p>
        </div>

        <PricingPlansGrid />
      </div>
    </section>
  );
};

export default PricingPreviewSection;
