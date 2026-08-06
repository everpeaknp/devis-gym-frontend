export type MembershipPlan = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  currency: string;
  currencySymbol: string;
  duration: string;
  features: string[];
  excluded?: string[];
  available: boolean;
  popular?: boolean;
  order: number;
  admissionFee?: {
    amount: number;
    note: string;
  };
};

export const membershipPlans: MembershipPlan[] = [
  {
    id: "per-day",
    name: "Per Day",
    subtitle: "Try before you commit",
    price: 300,
    currency: "NPR",
    currencySymbol: "₹",
    duration: "/day",
    order: 1,
    admissionFee: {
      amount: 500,
      note: "+ ₹500 one-time admission fee"
    },
    features: [
      "Full gym access",
      "All equipment",
    ],
    available: true,
  },
  {
    id: "15-days",
    name: "15 Days",
    subtitle: "Short term plan",
    price: 2000,
    currency: "NPR",
    currencySymbol: "₹",
    duration: "/15 days",
    order: 2,
    admissionFee: {
      amount: 500,
      note: "+ ₹500 one-time admission fee"
    },
    features: [
      "Full gym access",
      "All equipment",
      "Group classes",
    ],
    available: true,
  },
  {
    id: "1-month",
    name: "1 Month",
    subtitle: "Most popular plan",
    price: 2500,
    currency: "NPR",
    currencySymbol: "₹",
    duration: "/month",
    order: 3,
    admissionFee: {
      amount: 500,
      note: "+ ₹500 one-time admission fee"
    },
    features: [
      "Full gym access",
      "All equipment",
      "Group classes",
      "Cardio sessions",
    ],
    available: true,
  },
  {
    id: "3-months",
    name: "3 Months",
    subtitle: "Best value",
    price: 6000,
    currency: "NPR",
    currencySymbol: "₹",
    duration: "/3 months",
    order: 4,
    admissionFee: {
      amount: 500,
      note: "+ ₹500 one-time admission fee"
    },
    features: [
      "Full gym access",
      "All equipment",
      "Unlimited group classes",
      "Cardio sessions",
    ],
    available: true,
  },
  {
    id: "6-months",
    name: "6 Months",
    subtitle: "Serious commitment",
    price: 11000,
    currency: "NPR",
    currencySymbol: "₹",
    duration: "/6 months",
    order: 5,
    admissionFee: {
      amount: 500,
      note: "+ ₹500 one-time admission fee"
    },
    features: [
      "Full gym access",
      "All equipment",
      "Unlimited group classes",
      "Cardio sessions",
      "Priority support",
    ],
    available: true,
    popular: true,
  },
  {
    id: "1-year",
    name: "1 Year",
    subtitle: "Ultimate commitment",
    price: 18000,
    currency: "NPR",
    currencySymbol: "₹",
    duration: "/year",
    order: 6,
    admissionFee: {
      amount: 500,
      note: "+ ₹500 one-time admission fee"
    },
    features: [
      "Full gym access",
      "All equipment",
      "Unlimited group classes",
      "Cardio sessions",
      "Priority support",
      "Best value per month",
    ],
    available: true,
  },
];

export const membershipInfo = {
  available: true,
  note: "All plans include full gym access and locker room facilities.",
};
