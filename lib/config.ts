/**
 * Site Configuration
 * Dynamically sets the base URL based on environment variables
 * - Uses NEXT_PUBLIC_BASE_URL if explicitly set (for custom domains)
 * - Falls back to VERCEL_URL (automatically set on Vercel)
 * - Defaults to localhost for local development
 */

const getBaseUrl = (): string => {
  // Explicitly set custom domain
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }

  // Vercel deployment
  if (process.env.VERCEL_URL) {
    const protocol = process.env.VERCEL_ENV === "production" ? "https" : "http";
    return `${protocol}://${process.env.VERCEL_URL}`;
  }

  // Local development fallback
  return "http://localhost:3000";
};

export const siteConfig = {
  baseUrl: getBaseUrl(),
  name: "Bilal Ahmed",
  title: "Bilal Ahmed | Frontend Developer",
  description:
    "Frontend developer specializing in React, Next.js, and modern web technologies",
  author: "Bilal Ahmed",
  email: "bilalahmed19015@gmail.com",
  social: {
    github: "https://github.com/bilal-ahmed-tech",
    linkedin: "https://www.linkedin.com/in/bilal-ahmed-b54439369/",
    whatsapp: "https://wa.me/923276742759",
  },
};

export const getCanonicalUrl = (path: string = "/") => {
  return `${siteConfig.baseUrl}${path}`;
};
