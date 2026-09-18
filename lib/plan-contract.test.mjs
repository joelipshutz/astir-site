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
