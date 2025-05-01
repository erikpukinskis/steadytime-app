import { query } from "@convex/server"
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
