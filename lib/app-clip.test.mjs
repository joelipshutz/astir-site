import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { appClipBanner } from "./app-clip.ts";

test("Clip discovery preserves each exact share destination and card token", () => {
  for (const root of ["profiles", "places", "lists", "activities", "invites"]) {
    for (const prefix of ["", "cards/"]) {
      const url = `https://astirmovement.com/${prefix}${root}/fixture?card=${"a".repeat(48)}`;
      assert.equal(appClipBanner(url, true, "true"),
        `app-id=6776850787, app-clip-bundle-id=com.grayline.wander.Clip, app-argument=${url}`);
    }
  }
});

test("Clip discovery is off by default and never advertises unavailable or untrusted destinations", () => {
  const url = "https://astirmovement.com/places/fixture";
  for (const enabled of [undefined, "false", "TRUE", "1"]) assert.equal(appClipBanner(url, true, enabled), undefined);
  assert.equal(appClipBanner(url, false, "true"), undefined);
  for (const invalid of ["invalid", "http://astirmovement.com/places/fixture", "https://evil.test/places/fixture",
    "https://astirmovement.com/", "https://astirmovement.com/plans/fixture", "https://user@astirmovement.com/places/fixture"]) {
    assert.equal(appClipBanner(invalid, true, "true"), undefined);
  }
});

test("every served association variant declares the corresponding Clip", async () => {
  for (const file of ["apple-app-site-association", ".well-known/apple-app-site-association", ".well-known/astir-apple-app-site-association.json"]) {
    const aasa = JSON.parse(await readFile(new URL(`../public/${file}`, import.meta.url), "utf8"));
    assert.deepEqual(aasa.appclips, { apps: ["Y7TVK75RZ8.com.grayline.wander.Clip"] });
    assert.deepEqual(aasa.applinks.details[0].appIDs, ["Y7TVK75RZ8.com.grayline.wander"]);
  }
});
