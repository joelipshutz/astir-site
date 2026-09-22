import assert from "node:assert/strict";
import test from "node:test";
import { marketingRedirects, astirAssociationRewrites } from "./domain-migration.ts";

test("cutover is disabled until the destination is verified", () => {
  assert.deepEqual(marketingRedirects(false), []);
});

test("only old marketing hosts redirect, without losing their page", () => {
  const rules = marketingRedirects(true);
  for (const path of ["/", "/support", "/privacy", "/terms", "/how-it-works", "/import-help"]) {
    const rule = rules.find(value => value.source === path);
    assert.ok(rule);
    const host = new RegExp(rule.has[0].value);
    for (const oldHost of ["getrec.me", "www.getrec.me"]) assert.ok(host.test(oldHost));
    for (const otherHost of ["astirmovement.com", "www.astirmovement.com", "getrec.me.evil.example", "preview.vercel.app"]) assert.equal(host.test(otherHost), false);
    assert.equal(rule.destination, `https://astirmovement.com${path === "/" ? "" : path}`);
    assert.equal(rule.permanent, true);
  }
});

test("app links, shared cards, invitations and Apple association files remain served", () => {
  const rules = marketingRedirects(true);
  for (const path of ["/profiles/person", "/places/place", "/activities/activity", "/lists/list", "/invites/token", "/plans/token", "/cards/places/place", "/share/tiktok", "/.well-known/apple-app-site-association", "/apple-app-site-association"]) {
    assert.equal(rules.some(rule => rule.source === path || rule.source.includes(":")), false);
  }
});

test("new card associations are restricted to the exact Astir hosts", () => {
  const rules = astirAssociationRewrites();
  assert.deepEqual(rules.map(rule => rule.source), ["/.well-known/apple-app-site-association", "/apple-app-site-association"]);
  for (const rule of rules) {
    const host = new RegExp(rule.has[0].value);
    for (const value of ["astirmovement.com", "www.astirmovement.com"]) assert.ok(host.test(value));
    for (const value of ["getrec.me", "www.getrec.me", "astirmovement.com.evil.example", "preview.vercel.app"]) assert.equal(host.test(value), false);
    assert.equal(rule.destination, "/.well-known/astir-apple-app-site-association.json");
  }
});
