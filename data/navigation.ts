export type NavItem = {
  label: string;
  href: string;
};

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Gym", href: "/gym" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Membership", href: "/membership" },
];
