import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // EC2 Node server (default output). NOT `output: "export"` — the contact
  // Server Action + Nodemailer need a runtime. All content pages are still
  // statically prerendered via generateStaticParams.
  poweredByHeader: false,
  compress: true,
  // SVGs aren't optimizable by the image loader; we serve the trimmed PNG
  // logos as plain static assets, so disable the optimizer entirely.
  images: { unoptimized: true },
};

export default nextConfig;
