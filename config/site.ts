// All external links live here. Edit once, used everywhere.
export const siteConfig = {
  name: "Byte Club",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www-byteclub.vercel.app",
  email: "sneakout@pm.me",
  privacyEmail: "sneakout@pm.me",
  // Nonprofit intake form. /partner redirects here too (see next.config.ts).
  partnerFormUrl: "https://airtable.com/appWAinBEBEwA4PUW/pagVG7281hKy3H17P/form",
  links: {
    discord: "https://discord.gg/DjRrFxsgTa",
    linkedin: "https://www.linkedin.com/company/hcbyteclub",
    github: "https://github.com/byteclub",
  },
} as const;
