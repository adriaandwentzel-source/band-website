# Final review — 10 October 2026

Completed and deployed to https://adriaandwentzel-source.github.io/band-website/ using GitHub Actions. Repository: https://github.com/adriaandwentzel-source/band-website. Deployment run 38036156433 succeeded for commit 608fa4d. All eight live pages and the sitemap returned HTTP 200. The live homepage and EPK were checked at mobile width without overflow or broken images; desktop homepage was visually verified. Content is still clearly marked as placeholders.

## Validation

- Lint passed, including Astro templates.
- Typecheck passed with zero errors and zero warnings; one non-blocking type hint in the audit script.
- Eight content tests passed: valid content, invalid dates, unsafe links/media/asset paths, required labels, show classification/order and referenced asset existence.
- Static build passed: eight public pages plus 404, robots.txt and sitemap.
- Dependency audit: zero vulnerabilities.
- Both root and /test-band/ builds passed: 154 local links/assets and page metadata checked in each. Canonicals, Open Graph paths and sitemap respect the configured base.
- All five press-download files returned HTTP 200.
- Browser review at 320 px, 390 px and 1440 px: no horizontal overflow or broken images across all eight pages. Desktop Home and EPK, plus mobile Home previews are saved beside the project folder.
- Initial pages contain no third-party iframes; players require an explicit click. No site analytics, cookie storage, forms or backend.

## Lighthouse

Measured on the final static build at localhost, before activating third-party media. Mobile uses Lighthouse's standard mobile preset; desktop uses its official desktop preset. Full HTML and JSON reports are in ../site-audits. Scores are measurements for the supplied demo content, not a guarantee for replacement photos or production hosting.

| Page | Device | Performance | Accessibility | Best practices | SEO |
| --- | --- | ---: | ---: | ---: | ---: |
| home | mobile | 100 | 100 | 100 | 100 |
| music | mobile | 100 | 100 | 100 | 100 |
| videos | mobile | 100 | 100 | 100 | 100 |
| shows | mobile | 100 | 100 | 100 | 100 |
| merch | mobile | 100 | 100 | 100 | 100 |
| about | mobile | 100 | 100 | 100 | 100 |
| epk | mobile | 100 | 100 | 100 | 100 |
| contact | mobile | 100 | 100 | 100 | 100 |
| home | desktop | 100 | 100 | 100 | 100 |
| music | desktop | 100 | 100 | 100 | 100 |
| videos | desktop | 100 | 100 | 100 | 100 |
| shows | desktop | 100 | 100 | 100 | 100 |
| merch | desktop | 100 | 100 | 100 | 100 |
| about | desktop | 100 | 100 | 100 | 100 |
| epk | desktop | 100 | 100 | 100 | 100 |
| contact | desktop | 100 | 100 | 100 | 100 |

## Remaining manual work

Replace all demo band identity, biographies, members, photos, logos, music/releases, videos, dates, merch, contacts, social profiles, press quotes, facts, follower statistics, SEO and technical documents in band.json and public/images. Supply a GitHub repository, configure site.url/site.base, enable GitHub Actions as the Pages source, and run deployment. Add your domain and DNS settings if required; README contains the steps.

The EPK button calls the browser print dialog with a white-paper print stylesheet. The in-app browser did not expose a usable print preview or native download event; PDF pagination has not been visually verified. Save as PDF in your normal browser and review pagination after adding real content. Actual Spotify/Bandcamp/YouTube IDs remain blank, so real media playback is not verified. Activated third-party players apply their own privacy/storage behavior.



