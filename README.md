# Metalcore band website + EPK

Astro + TypeScript + Tailwind, generated as static HTML. No backend, analytics, site cookies, forms or commerce integrations. All editable content, navigation labels and site settings live in `src/content/band.json`. Assets live in `public/images`. VOID SIGNAL and every supplied band fact are labelled demo content.

## Start locally

Install Node.js 22.12 or newer, then open this folder in a terminal:

```sh
npm ci
npm run dev
```

Open the displayed local URL. To test the production build:

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run preview
```

If Astro telemetry cannot write settings on your computer, set `ASTRO_TELEMETRY_DISABLED=1` in your terminal. The deployment workflow already disables it.

## Edit content without code

Open `src/content/band.json`, keep its existing keys and JSON punctuation, edit values, and save. Copy an existing item to add a release, show, member, product, video, contact, quote or download. Remove items to remove content; empty lists are supported except releases and contacts, which need at least one item. The first release is the latest release featured on Home. Required navigation and interface labels are validated.

The content validator rejects malformed dates, unsafe links, invalid media IDs and missing required fields. Tests also verify that every referenced asset exists. Blank external URLs show a labelled placeholder or omit a link. Blank product URLs show “Buy at shows”. Do not leave fake live links in place.

| Field | What to enter |
| --- | --- |
| `name`, `tagline`, `genre`, `location`, `formed` | Real band identity and concise hero headline |
| `shortBio`, `longBio` | Approximately 50 and 200–300 words; newline-separated paragraphs supported |
| `hero`, `heroAlt`, `logo` | Local asset paths and useful photo description |
| `site.url` | Site origin, e.g. `https://YOUR-USERNAME.github.io` |
| `site.base` | `/REPOSITORY/` for project Pages, `/` for user Pages or custom domain; trailing slash required |
| `site.description`, `site.ogImage` | Search summary and 1200×630 PNG/JPEG social image |
| `site.timezone` | Your band's timezone, e.g. `Africa/Johannesburg` |
| `releases` | Covers, titles, years, type, ordered tracks and HTTPS listening links |
| `spotifyId` | Album ID only (22 characters), or empty string |
| `bandcampAlbumId` | Numeric album ID from Bandcamp embed code, or empty string |
| `videos[].youtubeId` | Eleven-character ID after `watch?v=` or `youtu.be/`, or empty string |
| `videos[].thumbnail` | Local thumbnail; no remote thumbnail request on page load |
| `shows` | `YYYY-MM-DD`, venue, city and optional HTTPS tickets URL |
| `merch` | Product photo, description/price and optional external store link |
| `members` | Name, role and local photo |
| `contacts`, `socials` | Actual booking/management/press emails and official HTTPS profiles |
| `epk` | Verified facts, attributed quotes, selected tracks, stats with measurement date and download paths |
| `placeholder` | Change to `false` only after replacing ALL demo content and artwork |

Shows are sorted ascending for upcoming, descending for past, using your configured timezone. Shows happening today remain upcoming. Static pages update at build time. The workflow rebuilds daily at 01:17 UTC (03:17 Johannesburg) and on every push. Scheduled Actions can be delayed or disabled by GitHub for inactive repositories; run the workflow manually if required.

## Images and press downloads

Put files in `public/images` and reference them as `/images/filename.webp` in JSON, even when hosted under a repository path. The site adds the base path automatically. Use simple filenames without spaces. Replace the supplied SVG placeholders with your own photos/artwork; SVGs are original demo graphics, not actual band photography.

Use optimized WebP/AVIF/JPEG for web photos, around 1600×900 for hero, square release/merch covers, and portrait member photos. Keep web assets small (ideally below 200 KB). Keep separate full-resolution press photos. Download paths can reference PDF, ZIP, SVG, TXT, CSV and image files inside the same folder. Replace the sample rider, stage plot and input list with approved production documents; replace the single demo logo SVG with a real logo pack ZIP. High-resolution downloads aren't loaded until requested.

The favicon lives at `public/images/favicon.svg`: replace that file in place. Replace `og.png` with your actual branded social card. Long biography text respects line breaks.

## EPK and PDF

Open `/epk/` and click **Download EPK as PDF**. This opens the browser print dialog: choose **Save as PDF**. Print styles use white paper, dark text and useful links, and hide navigation, interactive players and buttons. This is browser-generated PDF, not a server download. Review your completed EPK's page breaks before distributing; adding long content changes pagination.

## Privacy and speed

Inter and Oswald are Google Fonts, self-hosted as WOFF2 under the SIL Open Font License. Copies of their licences are in `src/assets`. Fonts and all preview images are served locally; there are no third-party requests on initial page load. Spotify, Bandcamp and YouTube players load only after a visitor clicks. YouTube uses `youtube-nocookie.com`. Once activated, the third-party provider controls its own storage and privacy behavior; the site itself sets no cookies. External stores and streaming links take visitors to those providers.

## GitHub Pages deployment

1. Create/select your GitHub repository. Put the **contents of this folder** at its root (not inside `outputs/band-site`). Include `package-lock.json` and `.github`, exclude `node_modules`, `.astro` and `dist`.
2. For `https://USERNAME.github.io/REPOSITORY/`, set JSON `site.url` to `https://USERNAME.github.io` and `site.base` to `/REPOSITORY/`. For a `USERNAME.github.io` repository, set base to `/`.
3. Push to `main`. If you use another branch, edit both branch names in `.github/workflows/deploy.yml`.
4. In the repository's **Settings → Pages**, select **GitHub Actions** as the source. Allow Actions if your account or organization restricts them.
5. Run **Validate and deploy GitHub Pages** in Actions or push a change. It installs locked dependencies, runs lint/typecheck/tests/build, and deploys only if all pass. Pull requests run checks without publishing.
6. Verify the reported Pages URL, all routes, downloads and social metadata. Live deployment has not been performed until a repository is supplied and a successful Actions deployment is observed.

Official setup: https://docs.astro.build/en/guides/deploy/github/

## Custom domain

1. Verify domain ownership in GitHub, then add your domain under **Settings → Pages → Custom domain** before changing DNS.
2. Set `site.url` to `https://YOUR-DOMAIN` and `site.base` to `/`, then commit and rebuild.
3. At your DNS provider, point a `www` CNAME at `USERNAME.github.io` (without the repository name). For an apex domain, use GitHub's documented A records or your provider's ALIAS/ANAME support.
4. After DNS validation and certificate issuance, enable **Enforce HTTPS** in Pages. Test the domain and redirects.

An Actions deployment does not require a `CNAME` file. Follow GitHub's current instructions for record values and domain verification: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Before publishing

Replace identity, bios, members, photos/logo, all releases and track names, streaming links and IDs, videos, shows, merch, social links, booking contacts, press quotes, facts, verified social counts, downloads, SEO description and social card. Configure your real site URL/base, then disable the demo banner. Never publish the sample technical documents as your actual requirements. Check final mobile/desktop pages and print output again after replacing assets.

Lighthouse scores depend on final images, hosting and activated embeds. Local placeholder-site measurements are recorded in `REVIEW.md`; they are not a guarantee for future content.
