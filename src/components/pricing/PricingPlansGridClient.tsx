"use client";

import { useMemo, useState } from "react";
import { Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buildDisplayPlan } from "@/components/pricing/pricing-content";
import {
  getPlanForTier,
  type SubscriptionPlanData,
} from "@/lib/subscription-plans";
import { useT } from "@/i18n/LocaleProvider";

type BillingCycle = "monthly" | "yearly";

interface PricingPlansGridClientProps {
  plans: SubscriptionPlanData[];
  className?: string;
}

const pricingGridClassName = "grid gap-4 lg:grid-cols-3";
// flex column so the CTA can be pinned to the bottom: Free lists fewer features than the paid
// plans, and without this its button stops mid-card while the others sit at the base.
const pricingCardClassName =
  "relative flex flex-col overflow-hidden rounded-[28px] p-[22px]";
const pricingBadgeClassName =
  "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]";
const pricingEyebrowClassName = "mt-[11px] text-[12.5px] font-medium text-white/42";
const pricingIconWrapClassName =
  "flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-[15px]";
const pricingValueRowClassName = "mt-[22px] flex items-end gap-2.5";
const pricingValueClassName =
  "font-parkinsans text-[34px] font-semibold leading-none tracking-[-0.05em] text-white";
const pricingValueMetaClassName = "pb-[3px] text-[12.5px] text-white/42";
const pricingCompareAtClassName =
  "pb-[3px] font-parkinsans text-[22px] font-semibold leading-none tracking-[-0.04em] text-white/28 line-through";
const pricingBilledRowClassName = "mt-1.5 flex flex-wrap items-center gap-2";
const pricingBilledNoteClassName = "text-[12px] leading-tight text-white/38";
const pricingSavingsBadgeClassName =
  "inline-flex items-center rounded-full bg-emerald-400/15 px-2 py-0.5 text-[11px] font-semibold leading-4 text-emerald-300";
// On the active (pink) toggle button green clashes; white reads cleanly.
const pricingSavingsOnActiveToggleClassName =
  "inline-flex items-center rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-semibold leading-4 text-white";
const pricingPopularBadgeClassName =
  "inline-flex items-center rounded-full bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-fuchsia-500/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-pink-200 ring-1 ring-pink-400/25";
const pricingDescriptionClassName =
  "mt-3 max-w-[30rem] text-[13px] leading-[1.6] text-white/60";
const pricingFeaturesClassName = "mt-5 space-y-2.5";
const pricingFeatureItemClassName =
  "flex items-start gap-[11px] text-[13px] leading-[1.5] text-white/72";
const pricingFeatureHighlightClassName = "font-semibold text-white";
const pricingFeatureIconClassName =
  "mt-px flex h-[17px] w-[17px] flex-shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-white/78";
const pricingFeatureHighlightIconClassName =
  "mt-px flex h-[17px] w-[17px] flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-500 text-white";
const pricingCtaClassName = "h-[38px] px-[18px] text-sm font-parkinsans";

const billingToggleShellClassName =
  "mx-auto mb-[26px] inline-flex items-center gap-1 rounded-full bg-white/[0.04] p-1";
const billingToggleButtonClassName =
  "rounded-full px-[18px] py-[7px] text-[13px] font-medium transition-colors duration-200";
const billingToggleActiveClassName =
  "bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 text-white";
const billingToggleInactiveClassName = "text-white/56 hover:text-white/80";

export default function PricingPlansGridClient({
  plans: catalogPlans,
  className,
}: PricingPlansGridClientProps) {
  // Yearly first: it is the better value and the option we want chosen, so it is the state
  // people land on rather than one they have to discover.
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("yearly");
  const t = useT("pricing");

  // The biggest yearly saving, for the toggle — it is what makes switching worth a click.
  const maxYearlySavings = useMemo(() => {
    const best = Math.max(
      0,
      ...catalogPlans
        .filter((p) => p.billing_cycle === "yearly" && p.tier !== "free")
        .map((p) => p.savings_percent ?? 0),
    );
    return best > 0 ? best : null;
  }, [catalogPlans]);

  const plans = useMemo(() => {
    const freePlan = getPlanForTier(catalogPlans, "free");
    const couplePlan = getPlanForTier(catalogPlans, "couple", billingCycle);
    const crowdPlan = getPlanForTier(catalogPlans, "crowd", billingCycle);

    if (!freePlan || !couplePlan || !crowdPlan) return [];

    return [
      buildDisplayPlan("free", freePlan, t),
      buildDisplayPlan("couple", couplePlan, t),
      buildDisplayPlan("crowd", crowdPlan, t),
    ];
  }, [billingCycle, catalogPlans, t]);

  if (plans.length === 0) return null;

  return (
    <div className={className}>
      <div className="flex flex-col items-center gap-2">
        <div className={billingToggleShellClassName}>
          <button
            type="button"
            onClick={() => setBillingCycle("yearly")}
            className={cn(
              billingToggleButtonClassName,
              billingCycle === "yearly"
                ? billingToggleActiveClassName
                : billingToggleInactiveClassName,
            )}
          >
            <span className="inline-flex items-center gap-2">
              {t("yearly")}
              {maxYearlySavings && (
                <span
                  className={
                    billingCycle === "yearly"
                      ? pricingSavingsOnActiveToggleClassName
                      : pricingSavingsBadgeClassName
                  }
                >
                  {t("saveUpTo", { percent: maxYearlySavings })}
                </span>
              )}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle("monthly")}
            className={cn(
              billingToggleButtonClassName,
              billingCycle === "monthly"
                ? billingToggleActiveClassName
                : billingToggleInactiveClassName,
            )}
          >
            {t("monthly")}
          </button>
        </div>
      </div>

      <div className={pricingGridClassName}>
        {plans.map((plan) => {
          const Icon = plan.icon;

          return (
            <article
              key={plan.tier}
              className={cn(pricingCardClassName, plan.cardClassName)}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={cn(pricingBadgeClassName, plan.badgeClassName)}
                    >
                      {plan.name}
                    </span>
                    {plan.isPopular && (
                      <span className={pricingPopularBadgeClassName}>{t("popular")}</span>
                    )}
                  </div>
                  <p className={pricingEyebrowClassName}>{plan.eyebrow}</p>
                </div>

                <span
                  className={cn(pricingIconWrapClassName, plan.iconClassName)}
                >
                  <Icon className="h-[17px] w-[17px]" />
                </span>
              </div>

              {/* One idea per line: price on top, what you are actually charged underneath. */}
              <div className={pricingValueRowClassName}>
                {plan.compareAtValue && (
                  <span className={pricingCompareAtClassName}>
                    {plan.compareAtValue}
                  </span>
                )}
                <span className={pricingValueClassName}>{plan.value}</span>
                <span className={pricingValueMetaClassName}>
                  {plan.valueMeta}
                </span>
              </div>
              {plan.billedNote && (
                <div className={pricingBilledRowClassName}>
                  <p className={pricingBilledNoteClassName}>{plan.billedNote}</p>
                  {plan.savingsPercent ? (
                    <span className={pricingSavingsBadgeClassName}>
                      {t("savePercent", { percent: plan.savingsPercent })}
                    </span>
                  ) : null}
                </div>
              )}

              <p className={pricingDescriptionClassName}>{plan.description}</p>

              <ul className={pricingFeaturesClassName}>
                {plan.features.map((feature) => (
                  <li
                    key={feature.text}
                    className={cn(
                      pricingFeatureItemClassName,
                      feature.highlight && pricingFeatureHighlightClassName,
                    )}
                  >
                    <span
                      className={
                        feature.highlight
                          ? pricingFeatureHighlightIconClassName
                          : pricingFeatureIconClassName
                      }
                    >
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    </span>
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>

              {/* mt-auto pins the CTA to the card bottom whatever the feature count. */}
              <div className="mt-auto pt-[22px]">
                <Button
                  asChild
                  variant={plan.ctaVariant}
                  size="lg"
                  className={cn("w-full", pricingCtaClassName)}
                >
                  <a href={plan.ctaHref} rel="noopener">
                    {plan.ctaLabel}
                  </a>
                </Button>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-6 text-center text-[12px] leading-5 text-white/45">
        {/* Inline, so it stays with the first word when the line wraps on a phone. */}
        <ShieldCheck className="me-1.5 inline h-3.5 w-3.5 align-[-3px] text-emerald-300/80" />
        {t("reassurance")}
      </p>
    </div>
  );
}
