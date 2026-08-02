export type SocialPlatform = {
  key: "instagram" | "tiktok" | "facebook";
  label: string;
  handle: string;
  url: string;
};

export const socialLinks: SocialPlatform[] = [
  {
    key: "instagram",
    label: "Instagram",
    handle: "@devisgym_pokhara",
    url: "https://www.instagram.com/devisgym_pokhara/",
  },
  {
    key: "tiktok",
    label: "TikTok",
    handle: "@devisgymcafepokhara",
    url: "https://www.tiktok.com/@devisgymcafepokhara",
  },
  {
    key: "facebook",
    label: "Facebook",
    handle: "Devi's Gym",
    url: "https://www.facebook.com/DevisGym",
  },
];

export const getSocial = (key: SocialPlatform["key"]) =>
  socialLinks.find((s) => s.key === key)!;
