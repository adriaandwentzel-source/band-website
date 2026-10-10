import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
const band = JSON.parse(
  fs.readFileSync(new URL("./src/content/band.json", import.meta.url), "utf8"),
);
export default defineConfig({
  site: process.env.SITE_URL || band.site.url,
  base: process.env.BASE_PATH || band.site.base,
  output: "static",
  build: { inlineStylesheets: "always" },
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
