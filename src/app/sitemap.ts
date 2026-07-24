import type { MetadataRoute } from "next";
import { canonical } from "@/lib/site";

// Static export — emitted to sitemap.xml at build time.
export const dynamic = "force-static";

type ChangeFreq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

const ROUTES: { path: string; changeFrequency: ChangeFreq; priority: number }[] = [
  { path: "/", changeFrequency: "monthly", priority: 1.0 },
  { path: "/services/", changeFrequency: "monthly", priority: 0.9 },
  { path: "/booking/", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about/", changeFrequency: "monthly", priority: 0.8 },
  { path: "/gallery/", changeFrequency: "monthly", priority: 0.8 },
  { path: "/privacy-policy/", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-of-service/", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: canonical(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
