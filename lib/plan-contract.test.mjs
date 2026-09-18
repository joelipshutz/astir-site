import assert from "node:assert/strict";
import test from "node:test";
import { planImageURL, readPlacePlan, validPlanToken } from "./plan-contract.ts";

test("only opaque invitation tokens are accepted", () => {
  assert.ok(validPlanToken("ab".repeat(24)));
  for (const token of ["", "a".repeat(47), "g".repeat(48), "../places/a", "a".repeat(48) + "?redirect=evil"]) {
    assert.equal(validPlanToken(token), false);
  }
});

test("artwork is confined to the invitation bucket on the configured server", () => {
  const path = "user_test/00000000-1111-2222-3333-444444444444/preview.png";
  assert.equal(planImageURL("https://example.supabase.co", path), `https://example.supabase.co/storage/v1/object/public/place-plan-previews/${path}`);
  for (const invalid of ["https://evil.test/image.png", "../secrets", "user/../../secret", "user/x/private.png", "../00000000-1111-2222-3333-444444444444/preview.png"]) {
    assert.equal(planImageURL("https://example.supabase.co", invalid), null);
  }
});

test("unavailable and malformed responses never create a generic website preview", () => {
  for (const payload of [null, {}, { title: "A place" }, "error"]) assert.equal(readPlacePlan(payload), null);
});

// Both Apple discovery paths must dispatch plans to the same native app.
test("invitation universal links and download fallback stay wired", async () => {
  const { readFile } = await import("node:fs/promises");
  const first = JSON.parse(await readFile(new URL("../public/.well-known/apple-app-site-association", import.meta.url), "utf8"));
  const second = JSON.parse(await readFile(new URL("../public/apple-app-site-association", import.meta.url), "utf8"));
  assert.deepEqual(first, second);
  assert.ok(first.applinks.details[0].components.some(value => value["/"] === "/plans/*"));
  const page = await readFile(new URL("../app/plans/[token]/page.tsx", import.meta.url), "utf8");
  assert.ok(page.includes("recme://plans/${token}"));
  assert.ok(page.includes("href={primaryDownloadURL}"));
});
