import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { pricingPlans } from "@/components/pricing/pricing-content";

interface PricingPlansGridProps {
  className?: string;
}

export default function PricingPlansGrid({
  className,
}: PricingPlansGridProps) {
  return (
    <div className={cn("grid gap-5 xl:grid-cols-2", className)}>
      {pricingPlans.map((plan) => {
        const Icon = plan.icon;

        return (
          <article
            key={plan.name}
            className={cn(
              "relative overflow-hidden rounded-[2rem] px-6 py-6 md:px-7 md:py-7",
              plan.cardClassName
            )}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]",
                    plan.badgeClassName
                  )}
                >
                  {plan.name}
                </span>
                <p className="mt-4 text-sm font-medium text-white/42">
                  {plan.eyebrow}
                </p>
              </div>

              <span
                className={cn(
                  "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[1.2rem]",
                  plan.iconClassName
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
            </div>

            <div className="mt-8 flex items-end gap-3">
              <span className="font-parkinsans text-[2.6rem] font-semibold leading-none tracking-[-0.05em] text-white md:text-[3rem]">
                {plan.value}
              </span>
              <span className="pb-1.5 text-sm text-white/42">
                {plan.valueMeta}
              </span>
            </div>

            <p className="mt-4 max-w-[32rem] text-sm leading-7 text-white/60 md:text-[15px]">
              {plan.description}
            </p>

            <ul className="mt-8 space-y-3.5">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm leading-6 text-white/72 md:text-[15px]"
                >
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-white/78">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button
                asChild
                variant={plan.ctaVariant}
                size="lg"
                className="w-full font-parkinsans"
              >
                {plan.external ? (
                  <a href={plan.ctaHref} rel="noopener noreferrer">
                    {plan.ctaLabel}
                  </a>
                ) : (
                  <Link href={plan.ctaHref}>{plan.ctaLabel}</Link>
                )}
              </Button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
