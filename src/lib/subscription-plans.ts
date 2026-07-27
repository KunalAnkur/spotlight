export type SubscriptionPlanTier = "free" | "couple" | "crowd";

export interface SubscriptionPlanFeatures {
  max_room_participants: number;
  max_watch_minutes_per_day: number;
  screen_share_quality: string;
  ad_free_experience: boolean;
}

export interface SubscriptionPlanData {
  slug: string;
  tier: SubscriptionPlanTier;
  name: string;
  price: number;
  currency: string;
  billing_cycle: "monthly" | "yearly";
  features: SubscriptionPlanFeatures;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

// Fetched server-side (SSR/ISR, cached for an hour) so the pricing section always renders
// real numbers from the database. No hardcoded plan data in the frontend: if the fetch
// fails, this returns an empty list and the pricing section simply doesn't render.
export async function getSubscriptionPlans(): Promise<SubscriptionPlanData[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) return [];

  try {
    const res = await fetch(`${baseUrl}/api/v1/subscription-plans`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];

    const json: unknown = await res.json();
    const rawPlans = isRecord(json) && Array.isArray(json.data) ? json.data : [];

    return rawPlans
      .filter((item): item is Record<string, unknown> => isRecord(item))
      .map((item) => ({ ...item, price: Number(item.price) })) as SubscriptionPlanData[];
  } catch {
    return [];
  }
}

export function getPlanForTier(
  plans: SubscriptionPlanData[],
  tier: SubscriptionPlanTier,
  billingCycle: "monthly" | "yearly" = "monthly",
): SubscriptionPlanData | undefined {
  return plans.find((p) => p.tier === tier && p.billing_cycle === billingCycle);
}
