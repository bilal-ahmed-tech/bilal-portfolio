import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/projects"],
        disallow: ["/admin", "/studio", "/.next", "/node_modules"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/projects"],
        crawlDelay: 1,
      },
      {
        userAgent: "Bingbot",
        allow: ["/", "/projects"],
        crawlDelay: 1,
      },
    ],
    sitemap: `${siteConfig.baseUrl}/sitemap.xml`,
  };
}
