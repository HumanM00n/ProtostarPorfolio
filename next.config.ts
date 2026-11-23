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

const keystaticCsp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  // Keystatic charge sa police (Inter) depuis Google Fonts.
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' blob: data: https://images.pexels.com https://avatars.githubusercontent.com https://*.githubusercontent.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://api.github.com https://*.githubusercontent.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://github.com",
  "frame-ancestors 'none'",
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
  // Dev uniquement : Keystatic utilise 127.0.0.1 (et non localhost) en local, notamment pour la
  // connexion GitHub. Sans cette entrée, Next bloque le JS de dev et /keystatic reste blanc.
  allowedDevOrigins: ["127.0.0.1"],
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      // Back-office Keystatic : CSP propre (API GitHub, avatars). Déclarée après : elle remplace la CSP du site.
      { source: "/keystatic/:path*", headers: [{ key: "Content-Security-Policy", value: keystaticCsp }] },
      { source: "/keystatic", headers: [{ key: "Content-Security-Policy", value: keystaticCsp }] },
    ];
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
