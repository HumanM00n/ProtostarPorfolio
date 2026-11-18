import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
// Les previews Vercel affichent la barre d'outils Vercel (commentaires) : on l'autorise uniquement là.
const isPreview = process.env.VERCEL_ENV === "preview";

const TURNSTILE = "https://challenges.cloudflare.com";
const VERCEL_TOOLBAR = isPreview ? " https://vercel.live" : "";

/**
 * Content-Security-Policy sans nonce : le site reste 100 % statique.
 * 'unsafe-inline' est nécessaire aux scripts d'hydratation de Next.js sans nonce.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${TURNSTILE}${VERCEL_TOOLBAR}`,
  `style-src 'self' 'unsafe-inline'${VERCEL_TOOLBAR}`,
  `img-src 'self' blob: data: https://images.pexels.com${isPreview ? " https://vercel.live https://vercel.com" : ""}`,
  `font-src 'self'${isPreview ? " https://vercel.live https://assets.vercel.com" : ""}`,
  `connect-src 'self'${isPreview ? " https://vercel.live wss://ws-us3.pusher.com" : ""}`,
  `frame-src ${TURNSTILE}${VERCEL_TOOLBAR}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  images: {
    // Photos d'illustration hébergées sur Pexels (à remplacer par les vraies photos dans /public).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/photos/**",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
