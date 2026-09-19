import assert from "node:assert/strict";
import test from "node:test";
import { readShareCard, validShareCardToken } from "./share-card-contract.ts";

const card = { title: "Discover Ryan’s world", image_path: "user_fixture/11111111-2222-4333-8444-555555555555/preview.png" };
test("only opaque share tokens are accepted", () => {
  assert.equal(validShareCardToken("a".repeat(48)), true);
  for (const invalid of [undefined, ["a".repeat(48)], "A".repeat(48), "../private", "a".repeat(47)])
    assert.equal(validShareCardToken(invalid), false);
});
test("card metadata is confined to the public card bucket", () => {
  assert.deepEqual(readShareCard(card, "https://project.supabase.co/"), {
    title: card.title, imageURL: `https://project.supabase.co/storage/v1/object/public/share-card-previews/${card.image_path}`
  });
  for (const path of ["../private/image.png", "https://evil.test/preview.png", "user_fixture/../../private/preview.png", "/preview.png"])
    assert.equal(readShareCard({ ...card, image_path: path }, "https://project.supabase.co"), null);
  for (const value of [null, [], { ...card, title: "" }, { ...card, title: "x".repeat(501) }, { ...card, image_path: 4 }])
    assert.equal(readShareCard(value, "https://project.supabase.co"), null);
  assert.equal(readShareCard(card, "http://localhost"), null);
  assert.equal(readShareCard(card, "invalid"), null);
});
