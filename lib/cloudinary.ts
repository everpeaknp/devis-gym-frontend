/**
 * Requests an auto-format, auto-quality, width-capped version of a Cloudinary
 * asset via its on-the-fly transformation URL, instead of the untouched
 * original. Needed because next.config.ts sets images.unoptimized: true
 * (to avoid Vercel's paid image optimizer), which makes Next's <Image>
 * `quality` prop a no-op — it just renders the raw src as-is. These source
 * photos are multi-megabyte originals, so without this the browser downloads
 * and decodes the full-resolution file just to paint a small thumbnail.
 */
export function cldOptimize(url: string, width = 800): string {
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) return url;
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
}
