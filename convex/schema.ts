import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const fileTypes = v.union(
  v.literal("image"),
  v.literal("csv"),
  v.literal("pdf")
);

export default defineSchema({
  files: defineTable({
    name: v.string(),
    type: fileTypes,
    fileId: v.id("_storage"),
    orgId: v.string(),
  }).index("by_orgId", ["orgId"]),
  favourites: defineTable({
    fileId: v.id("files"),
    orgId: v.string()
  }).index("by_orgId_fileId", ["orgId", "fileId"]),
});
