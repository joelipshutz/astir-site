import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { appSchemeURL, websiteURL, validActivityID, publicProfileShareTitle } from "./site.ts";

const id = "41000000-0000-0000-0000-000000000001";
test("every share preserves its exact item in web and native routes", () => {
  for (const [kind, root] of Object.entries({ profile: "profiles", place: "places", list: "lists", invite: "invites", activity: "activities" })) {
    assert.equal(websiteURL(kind, id), `https://astirmovement.com/${root}/${id}`);
    assert.equal(appSchemeURL(kind, id), `recme://${root}/${id}`);
  }
  assert.equal(appSchemeURL("profile", "a/b?next=evil"), "recme://profiles/a%2Fb%3Fnext%3Devil");
});
test("activity routes reject malformed IDs", () => {
  assert.ok(validActivityID(id));
  assert.ok(validActivityID(id.toUpperCase()));
  for (const value of ["", "../profiles/me", `${id}?redirect=evil`, "local-wanna", "x".repeat(36)]) {
    assert.equal(validActivityID(value), false);
  }
});
test("both universal-link files include exact activity routes", async () => {
  const first = JSON.parse(await readFile(new URL("../public/.well-known/apple-app-site-association", import.meta.url), "utf8"));
  const second = JSON.parse(await readFile(new URL("../public/apple-app-site-association", import.meta.url), "utf8"));
  assert.deepEqual(first, second);
  assert.ok(first.applinks.details[0].components.some(value => value["/"] === "/activities/*"));
});

test("public profile metadata matches the approved title", () => {
  assert.equal(publicProfileShareTitle("Ryan Lieblein"), "Discover Ryan’s world");
  assert.equal(publicProfileShareTitle("  Maya   Chen  "), "Discover Maya’s world");
  assert.equal(publicProfileShareTitle(""), "Discover their world");
});
