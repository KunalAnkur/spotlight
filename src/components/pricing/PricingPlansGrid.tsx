import PricingPlansGridClient from "@/components/pricing/PricingPlansGridClient";
import { getSubscriptionPlans } from "@/lib/subscription-plans";

interface PricingPlansGridProps {
  className?: string;
}

export default async function PricingPlansGrid({ className }: PricingPlansGridProps) {
  const catalogPlans = await getSubscriptionPlans();

  return <PricingPlansGridClient plans={catalogPlans} className={className} />;
}
