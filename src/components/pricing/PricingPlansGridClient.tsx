"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buildDisplayPlan } from "@/components/pricing/pricing-content";
import {
  getPlanForTier,
  type SubscriptionPlanData,
} from "@/lib/subscription-plans";

type BillingCycle = "monthly" | "yearly";

interface PricingPlansGridClientProps {
  plans: SubscriptionPlanData[];
  className?: string;
}

const pricingGridClassName = "grid gap-4 lg:grid-cols-3";
// flex column so the CTA can be pinned to the bottom: Free lists fewer features than the paid
// plans, and without this its button stops mid-card while the others sit at the base.
const pricingCardClassName =
  "relative flex flex-col overflow-hidden rounded-[2rem] px-5 py-5 sm:px-6 sm:py-6";
const pricingBadgeClassName =
  "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]";
const pricingEyebrowClassName = "mt-3 text-[13px] font-medium text-white/42";
const pricingIconWrapClassName =
  "flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[1.1rem]";
const pricingValueRowClassName = "mt-6 flex items-end gap-2.5";
const pricingValueClassName =
  "font-parkinsans text-[2.35rem] font-semibold leading-none tracking-[-0.05em] text-white md:text-[2.7rem]";
const pricingValueMetaClassName = "pb-1 text-[13px] text-white/42";
const pricingCompareAtClassName =
  "pb-1 font-parkinsans text-[1.6rem] font-semibold leading-none tracking-[-0.04em] text-white/28 line-through md:text-[1.85rem]";
const pricingBilledNoteClassName = "mt-1.5 text-[12px] leading-tight text-white/38";
const pricingPopularBadgeClassName =
  "inline-flex items-center rounded-full bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-fuchsia-500/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-pink-200 ring-1 ring-pink-400/25";
const pricingDescriptionClassName =
  "mt-3 max-w-[30rem] text-[13px] leading-6 text-white/60 md:text-sm md:leading-6";
const pricingFeaturesClassName = "mt-6 space-y-2.5";
const pricingFeatureItemClassName =
  "flex items-start gap-3 text-[13px] leading-5 text-white/72 md:text-sm md:leading-6";
const pricingFeatureIconClassName =
  "mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-white/78";
const pricingCtaClassName = "h-10 px-5 text-sm font-parkinsans";

const billingToggleShellClassName =
  "mx-auto mb-6 inline-flex items-center gap-1 rounded-full bg-white/[0.04] p-1";
const billingToggleButtonClassName =
  "rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors duration-200";
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

  const plans = useMemo(() => {
    const freePlan = getPlanForTier(catalogPlans, "free");
    const couplePlan = getPlanForTier(catalogPlans, "couple", billingCycle);
    const crowdPlan = getPlanForTier(catalogPlans, "crowd", billingCycle);

    if (!freePlan || !couplePlan || !crowdPlan) return [];

    return [
      buildDisplayPlan("free", freePlan),
      buildDisplayPlan("couple", couplePlan),
      buildDisplayPlan("crowd", crowdPlan),
    ];
  }, [billingCycle, catalogPlans]);

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
            Yearly
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
            Monthly
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
                      <span className={pricingPopularBadgeClassName}>Popular</span>
                    )}
                  </div>
                  <p className={pricingEyebrowClassName}>{plan.eyebrow}</p>
                </div>

                <span
                  className={cn(pricingIconWrapClassName, plan.iconClassName)}
                >
                  <Icon className="h-[18px] w-[18px]" />
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
                <p className={pricingBilledNoteClassName}>{plan.billedNote}</p>
              )}

              <p className={pricingDescriptionClassName}>{plan.description}</p>

              <ul className={pricingFeaturesClassName}>
                {plan.features.map((feature) => (
                  <li key={feature} className={pricingFeatureItemClassName}>
                    <span className={pricingFeatureIconClassName}>
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* mt-auto pins the CTA to the card bottom whatever the feature count. */}
              <div className="mt-auto pt-6">
                <Button
                  asChild
                  variant={plan.ctaVariant}
                  size="lg"
                  className={cn("w-full", pricingCtaClassName)}
                >
                  <a href={plan.ctaHref} rel="noopener noreferrer">
                    {plan.ctaLabel}
                  </a>
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
