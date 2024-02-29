import { ConvexError, v } from "convex/values";
import { MutationCtx, QueryCtx, mutation, query } from "./_generated/server";
import { fileTypes } from "./schema";

// public functions

export const generateUploadUrl = mutation(async (ctx) => {
  authorize(ctx);
  return await ctx.storage.generateUploadUrl();
});

export const createFile = mutation({
  args: {
    name: v.string(),
    type: fileTypes,
    fileId: v.id("_storage"),
    orgId: v.string(),
  },
  async handler(ctx, args) {
    authorize(ctx);

    await ctx.db.insert("files", {
      name: args.name,
      type: args.type,
      fileId: args.fileId,
      orgId: args.orgId,
    });
  },
});

export const getFiles = query({
  args: {
    orgId: v.string(),
    searchTerm: v.optional(v.string()),
    favourites: v.optional(v.boolean()),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) return [];

    let files = await ctx.db
      .query("files")
      .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
      .collect();

    // if favourites true, filter for favourites and return
    if (args.favourites) {
      const favouriteFiles = await ctx.db
        .query("favourites")
        .withIndex("by_orgId_fileId", (q) => q.eq("orgId", args.orgId))
        .collect();

      files = files.filter((file) =>
        favouriteFiles.some((fav) => fav.fileId === file._id)
      );
    }

    const searchTerm = args.searchTerm;

    // no search term, return base files query
    if (!searchTerm) return files;

    // else if this is reached filter by search term
    return files.filter((file) =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  },
});

export const deleteFile = mutation({
  args: {
    fileId: v.id("files"),
  },
  async handler(ctx, args) {
    authorize(ctx);

    const file = await ctx.db.get(args.fileId);

    if (!file) throw new ConvexError("File does not exist.");

    await ctx.db.delete(args.fileId);
  },
});

export const favouriteFile = mutation({
  args: {
    fileId: v.id("files"),
  },
  async handler(ctx, args) {
    authorize(ctx);

    const file = await ctx.db.get(args.fileId);

    if (!file) throw new ConvexError("File does not exist.");

    const favourite = await ctx.db
      .query("favourites")
      .withIndex("by_orgId_fileId", (q) =>
        q.eq("orgId", file.orgId).eq("fileId", file._id)
      )
      .first();

    if (!favourite) {
      await ctx.db.insert("favourites", {
        fileId: file._id,
        orgId: file.orgId,
      });
    } else {
      await ctx.db.delete(favourite._id);
    }
  },
});

// local functions

async function authorize(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) throw new ConvexError("You must be logged in to do this.");
}
