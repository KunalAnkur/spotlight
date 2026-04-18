import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { pricingPlans } from "@/components/pricing/pricing-content";

interface PricingPlansGridProps {
  className?: string;
}

const pricingGridClassName = "grid gap-4 md:grid-cols-2";
const pricingCardClassName =
  "relative overflow-hidden rounded-[2rem] px-5 py-5 sm:px-6 sm:py-6";
const pricingBadgeClassName =
  "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]";
const pricingEyebrowClassName = "mt-3 text-[13px] font-medium text-white/42";
const pricingIconWrapClassName =
  "flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[1.1rem]";
const pricingValueRowClassName = "mt-6 flex items-end gap-2.5";
const pricingValueClassName =
  "font-parkinsans text-[2.35rem] font-semibold leading-none tracking-[-0.05em] text-white md:text-[2.7rem]";
const pricingValueMetaClassName = "pb-1 text-[13px] text-white/42";
const pricingDescriptionClassName =
  "mt-3 max-w-[30rem] text-[13px] leading-6 text-white/60 md:text-sm md:leading-6";
const pricingFeaturesClassName = "mt-6 space-y-2.5";
const pricingFeatureItemClassName =
  "flex items-start gap-3 text-[13px] leading-5 text-white/72 md:text-sm md:leading-6";
const pricingFeatureIconClassName =
  "mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-white/78";
const pricingCtaClassName = "h-10 px-5 text-sm font-parkinsans";

export default function PricingPlansGrid({ className }: PricingPlansGridProps) {
  return (
    <div className={cn(pricingGridClassName, className)}>
      {pricingPlans.map((plan) => {
        const Icon = plan.icon;

        return (
          <article
            key={plan.name}
            className={cn(pricingCardClassName, plan.cardClassName)}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <span
                  className={cn(pricingBadgeClassName, plan.badgeClassName)}
                >
                  {plan.name}
                </span>
                <p className={pricingEyebrowClassName}>{plan.eyebrow}</p>
              </div>

              <span
                className={cn(pricingIconWrapClassName, plan.iconClassName)}
              >
                <Icon className="h-[18px] w-[18px]" />
              </span>
            </div>

            <div className={pricingValueRowClassName}>
              <span className={pricingValueClassName}>{plan.value}</span>
              <span className={pricingValueMetaClassName}>
                {plan.valueMeta}
              </span>
            </div>

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

            <div className="mt-6">
              <Button
                asChild
                variant={plan.ctaVariant}
                size="lg"
                className={cn("w-full", pricingCtaClassName)}
              >
                {/* <a href={plan.ctaHref} rel="noopener noreferrer">
                  {plan.ctaLabel}
                </a> */}
                {plan.plan === 'free' ? (
                  <a href={plan.ctaHref} rel="noopener noreferrer">
                    {plan.ctaLabel}
                  </a> 
                ): (
                  <a rel="noopener noreferrer">
                    Coming Soon
                  </a>
                )}
              </Button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
