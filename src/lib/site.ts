// Single source of truth for the site's absolute URLs.
//
// The site deploys to GitHub Pages under a subpath (basePath), so every
// absolute URL — canonicals, OG images, sitemap, JSON-LD — must include that
// basePath. Do NOT build these with `new URL('/path', metadataBase)`: a leading
// slash resets to the origin and silently drops the basePath. Use the helpers
// here (they always include it) or `assetPath()` for public assets.

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Origin only, no basePath — e.g. https://alectronic-solutions.github.io */
export const SITE_ORIGIN = "https://alectronic-solutions.github.io";

/** basePath (subpath) the app is served from, e.g. /luxe-beauty-lounge-1 */
export const BASE_PATH = base;

/** Full site root, including basePath — e.g. https://…github.io/luxe-beauty-lounge-1 */
export const SITE_URL = `${SITE_ORIGIN}${base}`;

/**
 * Absolute, basePath-safe URL for a route.
 * canonical("/services/") → https://…github.io/luxe-beauty-lounge-1/services/
 */
export function canonical(path = "/"): string {
  return `${SITE_URL}${path}`;
}
