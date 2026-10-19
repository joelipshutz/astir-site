import assert from "node:assert/strict";
import test from "node:test";
import { readShareCard, validShareCardToken } from "./share-card-contract.ts";

const card = { preview_mode: "snapshot", title: "Discover Ryan’s world", description: "Ryan’s selected map", image_path: "user_fixture/11111111-2222-4333-8444-555555555555/preview.png" };
test("generic cards discard private titles and images", () => {
  assert.deepEqual(readShareCard({ ...card, preview_mode: "generic" }, "https://project.supabase.co"), {
    title: "Shared on Astir", imageURL: "https://astirmovement.com/brand/astir-wordmark.png"
  });
});
test("only opaque share tokens are accepted", () => {
  assert.equal(validShareCardToken("a".repeat(48)), true);
  for (const invalid of [undefined, ["a".repeat(48)], "A".repeat(48), "../private", "a".repeat(47)])
    assert.equal(validShareCardToken(invalid), false);
});
test("intentional snapshots use only the new artwork bucket", () => {
  assert.deepEqual(readShareCard(card, "https://project.supabase.co/"), {
    title: card.title, description: card.description,
    imageURL: `https://project.supabase.co/storage/v1/object/public/shared-link-snapshots/${card.image_path}`
  });
  for (const path of ["../private/image.png", "https://evil.test/preview.png", "user_fixture/../../private/preview.png", "/preview.png"])
    assert.equal(readShareCard({ ...card, image_path: path }, "https://project.supabase.co"), null);
  for (const value of [null, [], { ...card, title: "" }, { ...card, title: "x".repeat(501) }, { ...card, image_path: 4 }, { ...card, preview_mode: undefined }])
    assert.equal(readShareCard(value, "https://project.supabase.co"), null);
  for (const endpoint of ["http://localhost", "invalid", "https://user:password@project.supabase.co"])
    assert.equal(readShareCard(card, endpoint), null);
});
test("public context keeps entity text and safe avatar URLs without exposing legacy artwork", () => {
  assert.deepEqual(readShareCard({ ...card, preview_mode: "public", subtitle: "@ryan", image_url: "https://images.example/avatar.png" }, "https://project.supabase.co"), {
    title: card.title, description: card.description, subtitle: "@ryan", imageURL: "https://images.example/avatar.png", publicContext: true
  });
  for (const image_url of ["javascript:alert(1)", "http://example.com/a.png", "https://user:secret@example.com/a.png", "/relative.png"])
    assert.equal(readShareCard({ ...card, preview_mode: "public", image_url }, "https://project.supabase.co").imageURL, undefined);
});
