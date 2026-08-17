import { Crown, Heart, Sparkles, type LucideIcon } from "lucide-react";
import type {
  SubscriptionPlanData,
  SubscriptionPlanFeatures,
  SubscriptionPlanTier,
} from "@/lib/subscription-plans";

export interface PricingDisplayMeta {
  name: string;
  eyebrow: string;
  description: string;
  icon: LucideIcon;
  iconClassName: string;
  badgeClassName: string;
  cardClassName: string;
  ctaLabel: string;
  ctaHref: string;
  ctaVariant: "hero" | "outline";
  external?: boolean;
}

const paidCardClassName =
  "bg-[linear-gradient(180deg,rgba(244,63,94,0.07)_0%,rgba(255,255,255,0.03)_24%,rgba(255,255,255,0.022)_100%)] ring-1 ring-rose-400/20 shadow-[0_26px_64px_rgba(0,0,0,0.24)]";
const paidIconClassName =
  "bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 text-white shadow-[0_18px_36px_rgba(244,63,94,0.2)]";
const paidBadgeClassName = "bg-rose-500/12 text-rose-100";

export const PRICING_DISPLAY: Record<SubscriptionPlanTier, PricingDisplayMeta> = {
  free: {
    name: "Free",
    eyebrow: "For a quick watch",
    description: "Best for a quick watch party or trying Movmash out.",
    icon: Sparkles,
    iconClassName: "bg-white/[0.06] text-white/78",
    badgeClassName: "bg-white/[0.05] text-white/72",
    cardClassName:
      "bg-white/[0.024] ring-1 ring-white/8 shadow-[0_22px_54px_rgba(0,0,0,0.18)]",
    ctaLabel: "Start free",
    ctaHref: "https://app.movmash.com",
    ctaVariant: "outline",
    external: true,
  },
  couple: {
    name: "Couple Plan",
    eyebrow: "For couples & close friends",
    description: "Best for couples and close friends who watch together often.",
    icon: Heart,
    iconClassName: paidIconClassName,
    badgeClassName: paidBadgeClassName,
    cardClassName: paidCardClassName,
    ctaLabel: "Upgrade to Couple",
    ctaHref: "https://app.movmash.com/pricing",
    ctaVariant: "hero",
    external: true,
  },
  crowd: {
    name: "Crowd Plan",
    eyebrow: "For bigger watch parties",
    description: "Best for friend groups, fandoms, and bigger watch parties.",
    icon: Crown,
    iconClassName: paidIconClassName,
    badgeClassName: paidBadgeClassName,
    cardClassName: `${paidCardClassName} ring-2`,
    ctaLabel: "Upgrade to Crowd",
    ctaHref: "https://app.movmash.com/pricing",
    ctaVariant: "hero",
    external: true,
  },
};

/**
 * Mirrors costume's formatPlanPrice so the same plan reads identically on both surfaces:
 * whole amounts drop the decimals ($0, not $0.00) and the plan's own currency is honoured
 * rather than a hardcoded dollar sign.
 */
export function formatPlanPrice(amount: number, currency?: string | null): string {
  if (typeof amount !== "number" || Number.isNaN(amount)) return "";

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: (currency || "USD").toUpperCase(),
      maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount);
  } catch {
    return `$${amount.toFixed(2)}`;
  }
}

export function buildFeatureBullets(
  tier: SubscriptionPlanTier,
  features: SubscriptionPlanFeatures,
): string[] {
  const participants =
    tier === "crowd"
      ? `Up to ${features.max_room_participants} people per room`
      : `${features.max_room_participants} people per room`;

  if (tier === "free") {
    return [
      participants,
      `${features.max_watch_minutes_per_day} minutes of watch time per day`,
      `${features.screen_share_quality} screen sharing`,
      // Static, not from the plan: games are on every tier, and saying so on Free is the
      // point — the paid cards must not imply games are something you upgrade for.
      "Every game included",
    ];
  }

  const watchTime =
    features.max_watch_minutes_per_day === -1
      ? "Unlimited watch time"
      : `${features.max_watch_minutes_per_day} minutes of watch time per day`;

  // No "Ad-free" bullet: Movmash shows no ads on any plan, Free included, so listing it as a
  // paid perk would imply Free is ad-supported. The flag stays on the plan in case that changes.
  return [
    "Video + voice call while you watch",
    participants,
    watchTime,
    `${features.screen_share_quality} screen sharing`,
  ];
}

export function buildDisplayPlan(tier: SubscriptionPlanTier, plan: SubscriptionPlanData) {
  const display = PRICING_DISPLAY[tier];

  const isFree = tier === "free";

  return {
    ...display,
    tier,
    // Paid plans always show a per-month figure so tiers compare like for like; the yearly
    // one strikes through the monthly rate it undercuts. Every value comes from guardian.
    value: formatPlanPrice(
      isFree ? plan.price : plan.monthly_equivalent_price ?? plan.price,
      plan.currency,
    ),
    valueMeta: isFree ? "Free forever" : "per month",
    compareAtValue:
      !isFree && plan.compare_at_monthly_price != null
        ? formatPlanPrice(plan.compare_at_monthly_price, plan.currency)
        : null,
    billedNote:
      !isFree && plan.billing_cycle === "yearly"
        ? `${formatPlanPrice(plan.billed_amount ?? plan.price, plan.currency)} billed yearly`
        : null,
    isPopular: !isFree && plan.is_popular === true,
    features: buildFeatureBullets(tier, plan.features),
  };
}
