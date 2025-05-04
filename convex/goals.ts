import { mutation, query } from "@convex/server"
import { v } from "convex/values"
import { groupBy } from "lodash"

export const listCurrentGoalBins = query({
  handler: async (ctx) => {
    const bins = await ctx.db.query("goalBins").collect()
    const goalsByBinId = groupBy(await ctx.db.query("goals").collect(), "binId")

    return bins.map((bin) => ({
      ...bin,
      goals: goalsByBinId[bin._id] ?? [],
    }))
  },
})

export const addBin = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("goalBins", { name: args.name })
  },
})

export const deleteBin = mutation({
  args: {
    binId: v.id("goalBins"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.binId)
  },
})
