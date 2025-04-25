import { mutation, query } from "@convex/server"
import { v } from "convex/values"
import { getCurrentInstant, toUnix } from "~/helpers/time"

export const getConversation = query({
  args: {},
  handler: async (ctx) => {
    const messages = await ctx.db.query("messages").collect()

    return await Promise.all(
      messages.map(async (message) => ({
        ...message,
        response: message.selectedResponseId
          ? await ctx.db.get(message.selectedResponseId)
          : null,
      }))
    )
  },
})

export const findById = query({
  args: {
    id: v.id("messages"),
  },
  handler: async (ctx, args) => ctx.db.get(args.id),
})

export const send = mutation({
  args: {
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const messageId = await ctx.db.insert("messages", {
      text: args.text,
      sentAt: toUnix(getCurrentInstant()),
    })
    return messageId
  },
})

export const selectResponse = mutation({
  args: {
    messageId: v.id("messages"),
    responseId: v.id("responses"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.messageId, { selectedResponseId: args.responseId })
  },
})
