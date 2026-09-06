import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.6', '10.99.18.30'],
};

export default withNextIntl(nextConfig);
