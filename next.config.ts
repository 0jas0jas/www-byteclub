import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { siteConfig } from "./config/site";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Nonprofit inquiries now go through Airtable. The old /partner page is kept
  // but unlinked; send anyone with an old link to the new form.
  async redirects() {
    return [
      {
        source: "/:locale(fr|en)/partner",
        destination: siteConfig.partnerFormUrl,
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
