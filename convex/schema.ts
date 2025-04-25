import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export const vBlock = v.object({
  start: v.string(),
  end: v.string(),
  title: v.string(),
  guidance: v.array(v.string()),
  transition: v.optional(v.string()),
})

export default defineSchema({
  goals: defineTable({
    text: v.string(),
    completedAt: v.number(),
  }),
  moods: defineTable({
    text: v.string(),
    date: v.string(),
  }),
  biographies: defineTable({
    text: v.string(),
  }),
  messages: defineTable({
    text: v.string(),
    sentAt: v.number(),
    responseId: v.optional(v.id("responses")),
    replyingToResponseId: v.optional(v.id("responses")),
    selectedResponseId: v.optional(v.id("responses")),
  }),
  responses: defineTable({
    replyingToMessageId: v.id("messages"),
    responseMessageId: v.optional(v.id("messages")),
    openAIResponseId: v.string(),
    text: v.string(),
    blocks: v.optional(v.array(vBlock)),
    receivedAt: v.number(),
  }),
})
