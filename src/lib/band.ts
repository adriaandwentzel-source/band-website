import { z } from "zod";
import raw from "../content/band.json";
const text = z.string().min(1);
const url = z.union([
  z.literal(""),
  z
    .string()
    .url()
    .refine((v) => v.startsWith("https://"), "Use HTTPS URLs"),
]);
const asset = z
  .string()
  .regex(/^\/images\/[a-zA-Z0-9_./-]+$/)
  .refine((v) => !v.includes(".."), "No parent paths");
const link = z.object({ label: text, url });
const date = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine(
    (v) =>
      !Number.isNaN(Date.parse(v)) &&
      new Date(v).toISOString().slice(0, 10) === v,
    "Invalid calendar date",
  );
const pair = z.object({ label: text, value: text });
const requiredLabels = [
  "home",
  "music",
  "videos",
  "shows",
  "merch",
  "about",
  "epk",
  "contact",
  "latest",
  "nextShow",
  "listen",
  "tickets",
  "upcoming",
  "past",
  "buyAtShows",
  "print",
  "downloads",
  "topTracks",
  "topVideos",
  "facts",
  "quotes",
  "stats",
  "members",
  "booking",
  "placeholder",
  "footer",
  "loadEmbed",
  "embedNotice",
  "noShows",
  "bio",
  "shortBio",
  "longBio",
  "epkIntro",
  "contactIntro",
  "notFound",
  "backHome",
  "pdfHelp",
  "mediaPlaceholder",
  "skip",
  "navigation",
  "placeholderSuffix",
];
export const bandSchema = z.object({
  placeholder: z.boolean(),
  name: text,
  tagline: text,
  genre: text,
  location: text,
  formed: text,
  hero: asset,
  heroAlt: text,
  logo: asset,
  shortBio: text,
  longBio: text,
  site: z.object({
    url: z.string().url(),
    base: z.string().regex(/^\/(?:[a-zA-Z0-9_-]+\/)*$/),
    description: text,
    ogImage: asset,
    timezone: text.refine((v) => {
      try {
        new Intl.DateTimeFormat("en", { timeZone: v });
        return true;
      } catch {
        return false;
      }
    }, "Invalid timezone"),
  }),
  labels: z
    .record(text)
    .refine(
      (v) => requiredLabels.every((key) => key in v),
      "Missing required UI label",
    ),
  releases: z
    .array(
      z.object({
        title: text,
        year: z.number().int(),
        type: text,
        cover: asset,
        tracks: z.array(text),
        links: z.array(link),
        spotifyId: z.string().regex(/^(?:[A-Za-z0-9]{22})?$/),
        bandcampAlbumId: z.string().regex(/^\d*$/),
      }),
    )
    .min(1),
  videos: z.array(
    z.object({
      title: text,
      youtubeId: z.string().regex(/^(?:[A-Za-z0-9_-]{11})?$/),
      thumbnail: asset,
    }),
  ),
  shows: z.array(z.object({ date, venue: text, city: text, ticketUrl: url })),
  merch: z.array(
    z.object({ name: text, description: text, image: asset, url }),
  ),
  members: z.array(z.object({ name: text, role: text, photo: asset })),
  socials: z.array(link),
  contacts: z
    .array(z.object({ label: text, email: z.string().email() }))
    .min(1),
  epk: z.object({
    facts: z.array(pair),
    quotes: z.array(z.object({ quote: text, source: text, url })),
    stats: z.array(z.object({ label: text, value: text, asOf: text })),
    topTracks: z.array(text),
    downloads: z.array(
      z.object({ label: text, path: z.union([z.literal(""), asset]) }),
    ),
  }),
});
export const band = bandSchema.parse(raw);
export const href = (path: string) =>
  `${(import.meta.env?.BASE_URL || "/").replace(/\/$/, "")}${path}`;
export function splitShows(today: string) {
  return {
    upcoming: band.shows
      .filter((s) => s.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date)),
    past: band.shows
      .filter((s) => s.date < today)
      .sort((a, b) => b.date.localeCompare(a.date)),
  };
}
export const today = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: band.site.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
