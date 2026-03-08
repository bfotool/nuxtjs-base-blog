export const APP_NAME = "Bfotool Blog";

export const APP_DESCRIPTION =
  "Insights, tutorials, and stories for modern developers. Explore the latest in web development, design, and technology.";

export const POSTS_PER_PAGE = 6;

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export const SOCIAL_LINKS = {
  twitter: "https://twitter.com/devpulse",
  github: "https://github.com/devpulse",
  linkedin: "https://linkedin.com/company/devpulse",
} as const;
