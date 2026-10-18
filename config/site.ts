// All external links live here. Edit once, used everywhere.
export const siteConfig = {
  name: "Byte Club",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "hello@byteclub.example",
  privacyEmail: "privacy@byteclub.example",
  links: {
    discord: "https://discord.gg/your-invite",
    instagram: "https://instagram.com/byteclub",
    linkedin: "https://www.linkedin.com/company/byteclub",
    github: "https://github.com/byteclub",
  },
} as const;
