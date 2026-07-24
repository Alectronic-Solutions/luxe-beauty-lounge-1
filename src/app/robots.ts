import type { MetadataRoute } from "next";
import { canonical } from "@/lib/site";

// Static export — emitted to robots.txt at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/booking/thank-you/"],
    },
    sitemap: canonical("/sitemap.xml"),
  };
}
