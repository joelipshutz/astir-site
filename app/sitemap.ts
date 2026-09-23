import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/how-it-works",
    "/extensions",
    "/privacy",
    "/terms",
    "/community",
    "/privacy-choices",
    "/support",
    "/import-help"
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date("2026-09-23"),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7
  }));
}
