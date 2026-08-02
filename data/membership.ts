export type MembershipPlan = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  currency: string;
  duration: string;
  features: string[];
  excluded?: string[];
  available: boolean;
  popular?: boolean;
};

export const membershipPlans: MembershipPlan[] = [
  {
    id: "starter",
    name: "Starter",
    subtitle: "Perfect for beginners",
    price: 2900,
    currency: "NPR",
    duration: "/month",
    features: [
      "Full gym access",
      "Locker room access",
      "1 fitness assessment",
    ],
    excluded: [
      "Group classes",
      "Personal training",
    ],
    available: true,
  },
  {
    id: "professional",
    name: "Professional",
    subtitle: "Best value for serious athletes",
    price: 7900,
    currency: "NPR",
    duration: "/month",
    features: [
      "Everything in Starter",
      "Unlimited group classes",
      "4 PT sessions/month",
      "Nutrition planning",
      "Recovery zone access",
    ],
    available: true,
    popular: true,
  },
  {
    id: "elite",
    name: "Elite",
    subtitle: "Unlimited everything",
    price: 12900,
    currency: "NPR",
    duration: "/month",
    features: [
      "Everything in Pro",
      "Unlimited PT sessions",
      "Spa & sauna access",
      "Priority booking",
      "Guest passes (2/mo)",
    ],
    available: true,
  },
];

export const membershipInfo = {
  available: true,
  note: "All plans include full gym access and locker room facilities.",
};
