import { Crown, Heart, Sparkles, type LucideIcon } from "lucide-react";
import type { Translator } from "@/i18n/server";
import type {
  SubscriptionPlanData,
  SubscriptionPlanFeatures,
  SubscriptionPlanTier,
} from "@/lib/subscription-plans";

export interface PricingDisplayMeta {
  /** Key prefix into the "pricing" namespace: <prefix>Name/Eyebrow/Description/Cta. */
  copyKey: string;
  icon: LucideIcon;
  iconClassName: string;
  badgeClassName: string;
  cardClassName: string;
  ctaHref: string;
  ctaVariant: "hero" | "outline";
  external?: boolean;
}

const paidCardClassName =
  "bg-[linear-gradient(180deg,rgba(244,63,94,0.07)_0%,rgba(255,255,255,0.03)_24%,rgba(255,255,255,0.022)_100%)] ring-1 ring-rose-400/20 shadow-[0_26px_64px_rgba(0,0,0,0.24)]";
const paidIconClassName =
  "bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 text-white shadow-[0_18px_36px_rgba(244,63,94,0.2)]";
const paidBadgeClassName = "bg-rose-500/12 text-rose-100";
// The recommended plan (`is_popular` from guardian): a stronger ring and a pink glow so it is
// the obvious choice, lifted on desktop, and first on a phone where the cards stack and Free
// would otherwise fill the whole first screen. Mirrors costume's pricingFeaturedCardSurfaceClass.
const featuredCardClassName =
  "bg-[linear-gradient(180deg,rgba(236,72,153,0.16)_0%,rgba(244,63,94,0.06)_32%,rgba(255,255,255,0.025)_100%)] ring-2 ring-pink-500/60 shadow-[0_30px_80px_rgba(236,72,153,0.22)] lg:-translate-y-2 order-first lg:order-none";

export const PRICING_DISPLAY: Record<SubscriptionPlanTier, PricingDisplayMeta> = {
  free: {
    copyKey: "free",
    icon: Sparkles,
    iconClassName: "bg-white/[0.06] text-white/78",
    badgeClassName: "bg-white/[0.05] text-white/72",
    cardClassName:
      "bg-white/[0.024] ring-1 ring-white/8 shadow-[0_22px_54px_rgba(0,0,0,0.18)]",
    ctaHref: "https://app.movmash.com",
    ctaVariant: "outline",
    external: true,
  },
  couple: {
    copyKey: "couple",
    icon: Heart,
    iconClassName: paidIconClassName,
    badgeClassName: paidBadgeClassName,
    cardClassName: paidCardClassName,
    ctaHref: "https://app.movmash.com/pricing",
    ctaVariant: "hero",
    external: true,
  },
  crowd: {
    copyKey: "crowd",
    icon: Crown,
    iconClassName: paidIconClassName,
    badgeClassName: paidBadgeClassName,
    cardClassName: paidCardClassName,
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

export interface FeatureBullet {
  text: string;
  /** The reason to buy this plan: listed first, brighter and bolder. */
  highlight?: boolean;
}

export function buildFeatureBullets(
  tier: SubscriptionPlanTier,
  features: SubscriptionPlanFeatures,
  t: Translator,
): FeatureBullet[] {
  const participants = t(
    tier === "crowd" ? "participantsUpTo" : "participants",
    { count: features.max_room_participants },
  );

  // Static, not from the plan: games are on every tier. Free says so, and the paid cards say
  // it too, so nobody reads games as something Free lacks or something you upgrade for.
  const everyGame = { text: t("everyGame") };

  if (tier === "free") {
    return [
      { text: participants },
      { text: t("watchMinutes", { minutes: features.max_watch_minutes_per_day }) },
      { text: t("screenSharing", { quality: features.screen_share_quality }) },
      everyGame,
    ];
  }

  // People pay at the moment the free daily limit stops their film, so a plan without one
  // says that plainly rather than "unlimited watch time".
  const watchTime =
    features.max_watch_minutes_per_day === -1
      ? t("noDailyLimit")
      : t("watchMinutes", { minutes: features.max_watch_minutes_per_day });
  const screenSharing = { text: t("screenSharing", { quality: features.screen_share_quality }) };

  // No "Ad-free" bullet: Movmash shows no ads on any plan, Free included, so listing it as a
  // paid perk would imply Free is ad-supported. The flag stays on the plan in case that changes.
  if (tier === "crowd") {
    // Room size is what Crowd adds over Couple, so it leads there.
    return [
      { text: participants, highlight: true },
      { text: watchTime },
      { text: t("videoCall") },
      screenSharing,
      everyGame,
    ];
  }

  return [
    { text: watchTime, highlight: true },
    { text: t("videoCall") },
    screenSharing,
    { text: participants },
    everyGame,
  ];
}

export function buildDisplayPlan(
  tier: SubscriptionPlanTier,
  plan: SubscriptionPlanData,
  t: Translator,
) {
  const display = PRICING_DISPLAY[tier];

  const isFree = tier === "free";
  const isPopular = !isFree && plan.is_popular === true;

  return {
    ...display,
    // One loud button and one highlighted card on the page: the recommended plan's.
    cardClassName: isPopular ? featuredCardClassName : display.cardClassName,
    ctaVariant: isFree || isPopular ? display.ctaVariant : ("outline" as const),
    tier,
    name: t(`${display.copyKey}Name`),
    eyebrow: t(`${display.copyKey}Eyebrow`),
    description: t(`${display.copyKey}Description`),
    ctaLabel: t(`${display.copyKey}Cta`),
    // A paid card names the exact plan it is showing — tier and billing cycle — so the app
    // can carry on from this click instead of presenting the same three cards again and
    // asking for the choice a second time.
    ctaHref: isFree ? display.ctaHref : `${display.ctaHref}?plan=${encodeURIComponent(plan.slug)}`,
    // Paid plans always show a per-month figure so tiers compare like for like; the yearly
    // one strikes through the monthly rate it undercuts. Every value comes from guardian.
    value: formatPlanPrice(
      isFree ? plan.price : plan.monthly_equivalent_price ?? plan.price,
      plan.currency,
    ),
    valueMeta: isFree ? t("freeForever") : t("perMonth"),
    compareAtValue:
      !isFree && plan.compare_at_monthly_price != null
        ? formatPlanPrice(plan.compare_at_monthly_price, plan.currency)
        : null,
    billedNote:
      !isFree && plan.billing_cycle === "yearly"
        ? t("billedYearly", { amount: formatPlanPrice(plan.billed_amount ?? plan.price, plan.currency) })
        : null,
    isPopular,
    savingsPercent:
      !isFree && plan.billing_cycle === "yearly" ? plan.savings_percent ?? null : null,
    features: buildFeatureBullets(tier, plan.features, t),
  };
}
