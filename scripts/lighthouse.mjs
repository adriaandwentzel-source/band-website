import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import fs from "node:fs/promises";
import desktopConfig from "lighthouse/core/config/desktop-config.js";
const origin = process.argv[2] || "http://127.0.0.1:4322";
const output = process.argv[3] || "../../work/audits";
await fs.mkdir(output, { recursive: true });
const pages = [
  "",
  "music",
  "videos",
  "shows",
  "merch",
  "about",
  "epk",
  "contact",
];
const results = [];
for (const device of ["mobile", "desktop"]) {
  const chrome = await chromeLauncher.launch({
    chromePath: process.env.CHROME_PATH,
    chromeFlags: ["--headless", "--no-first-run"],
  });
  try {
    for (const page of pages) {
      const audit = await lighthouse(`${origin}/${page}${page ? "/" : ""}`, {
        port: chrome.port,
        output: "html",
        logLevel: "error",
        onlyCategories: [
          "performance",
          "accessibility",
          "best-practices",
          "seo",
        ],
      }, device === "desktop" ? desktopConfig : undefined);
      if (!audit || audit.lhr.runtimeError)
        throw new Error(JSON.stringify(audit?.lhr.runtimeError));
      const name = `${device}-${page || "home"}`;
      await fs.writeFile(`${output}/${name}.html`, audit.report);
      await fs.writeFile(`${output}/${name}.json`, JSON.stringify(audit.lhr));
      const row = {
        device,
        page: page || "home",
        scores: Object.fromEntries(
          Object.entries(audit.lhr.categories).map(([key, value]) => [
            key,
            Math.round(value.score * 100),
          ]),
        ),
      };
      results.push(row);
      console.log(JSON.stringify(row));
    }
  } finally {
    await chrome.kill();
  }
}
await fs.writeFile(`${output}/summary.json`, JSON.stringify(results, null, 2));
if (
  results.some((row) => Object.values(row.scores).some((score) => score < 95))
)
  process.exitCode = 1;
