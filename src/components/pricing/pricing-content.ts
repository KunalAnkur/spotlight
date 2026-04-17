import {
  Crown,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface PricingPlan {
  name: string;
  eyebrow: string;
  value: string;
  valueMeta: string;
  description: string;
  icon: LucideIcon;
  iconClassName: string;
  badgeClassName: string;
  cardClassName: string;
  ctaLabel: string;
  ctaHref: string;
  ctaVariant: "hero" | "outline";
  external?: boolean;
  features: string[];
}

export const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    eyebrow: "Small rooms",
    value: "$0",
    valueMeta: "Start anytime",
    description: "Best for quick private watch sessions.",
    icon: Sparkles,
    iconClassName: "bg-white/[0.06] text-white/78",
    badgeClassName: "bg-white/[0.05] text-white/72",
    cardClassName:
      "bg-white/[0.024] ring-1 ring-white/8 shadow-[0_22px_54px_rgba(0,0,0,0.18)]",
    ctaLabel: "Start free",
    ctaHref: "http://localhost:3000",
    ctaVariant: "outline",
    external: true,
    features: [
      "2 people per room",
      "2-hour sessions",
      "Basic room UI",
      "No audio or video calls",
    ],
  },
  {
    name: "Premium",
    eyebrow: "Large rooms",
    value: "$9.99",
    valueMeta: "per month",
    description: "Best for groups, longer sessions, and calls.",
    icon: Crown,
    iconClassName:
      "bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 text-white shadow-[0_18px_36px_rgba(244,63,94,0.2)]",
    badgeClassName: "bg-rose-500/12 text-rose-100",
    cardClassName:
      "bg-[linear-gradient(180deg,rgba(244,63,94,0.07)_0%,rgba(255,255,255,0.03)_24%,rgba(255,255,255,0.022)_100%)] ring-1 ring-rose-400/20 shadow-[0_26px_64px_rgba(0,0,0,0.24)]",
    ctaLabel: "View premium plan",
    ctaHref: "http://localhost:3000/pricing",
    ctaVariant: "hero",
    external: true,
    features: [
      "50+ people per room",
      "Unlimited time",
      "Audio and video calls",
      "Better room UI",
    ],
  },
];
