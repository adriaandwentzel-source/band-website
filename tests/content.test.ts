import test from "node:test";
import assert from "node:assert/strict";
import { bandSchema, band, splitShows } from "../src/lib/band";
import fs from "node:fs";
test("sample content validates", () =>
  assert.ok(bandSchema.safeParse(band).success));
test("invalid date rejected", () =>
  assert.equal(
    bandSchema.safeParse({
      ...band,
      shows: [{ date: "2026-02-30", venue: "X", city: "Y", ticketUrl: "" }],
    }).success,
    false,
  ));
test("unsafe links rejected", () =>
  assert.equal(
    bandSchema.safeParse({
      ...band,
      socials: [{ label: "X", url: "javascript:alert(1)" }],
    }).success,
    false,
  ));
test("media IDs reject URLs", () =>
  assert.equal(
    bandSchema.safeParse({
      ...band,
      videos: [{ ...band.videos[0], youtubeId: "https://youtube.com" }],
    }).success,
    false,
  ));
test("today is upcoming; past is descending", () => {
  const s = splitShows("2099-11-14");
  assert.equal(s.upcoming[0].date, "2099-11-14");
  assert.ok(s.past.every((v, i) => i === 0 || s.past[i - 1].date >= v.date));
  assert.equal(splitShows("2100-01-01").upcoming.length, 0);
});
test("all referenced assets exist", () => {
  const paths = [
    band.hero,
    band.logo,
    band.site.ogImage,
    ...band.members.map((v) => v.photo),
    ...band.releases.map((v) => v.cover),
    ...band.videos.map((v) => v.thumbnail),
    ...band.merch.map((v) => v.image),
    ...band.epk.downloads.map((v) => v.path),
  ];
  for (const path of paths.filter(Boolean))
    assert.ok(fs.existsSync(`public${path}`), `Missing ${path}`);
});
test("missing navigation labels rejected", () =>
  assert.equal(
    bandSchema.safeParse({ ...band, labels: { home: "Home" } }).success,
    false,
  ));
test("unsafe asset paths rejected", () =>
  assert.equal(
    bandSchema.safeParse({ ...band, hero: "/images/../secret" }).success,
    false,
  ));
