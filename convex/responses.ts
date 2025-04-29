import { api, internal } from "@convex/api"
import { action, internalMutation } from "@convex/server"
import { v } from "convex/values"
import OpenAI from "openai"
import type { ResponseInput } from "openai/resources/responses/responses"
import { z } from "zod"
import type { Block } from "./prompts"
import {
  blockSchema,
  emotionHacks,
  emotionManagement,
  goalTracking,
  informationCheck,
  overview,
  planning,
  timeAwareness,
} from "./prompts"
import { vBlock } from "./schema"
import { formatInstant, getCurrentInstant, toUnix } from "~/helpers/time"

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set")
}

const BIOS = [
  "Erik: married to Marie, parent to Lumina (1 y​ear old), caretaker of Woolly Bear (the dog).",
  "Daily rhythms: morning walk (~1 hr), brief check-in with Marie, evening dog walk, dinner around 4–5 pm.",
]

// export const get = query({
//   args: {},
//   handler: async (ctx) => ctx.db.query("messages").collect(),
// })

const currentGoals = {
  "Right Now": [
    "Answer Archive Resale questions for Spencer",
    "Check messages",
  ],
  "Later Today": [
    "Send one cold resume",
    "Work on Steadytime side project (1 block)",
  ],
  "This Week": [
    "Create list of local tech meetups.",
    "Continue side projects.",
  ],
  "Ongoing Goals": [
    "Build relationships with former colleagues.",
    {
      goal: "Progress on side projects:",
      subgoals: ["Steadytime", "MultiplayerDB", "Kernel"],
    },
    {
      "goal": "Make monthly home improvement progress",
      subgoals: [
        "Kitchen lamp replacement.",
        "Back patio steps repairs.",
        "Attic door repairs.",
      ],
    },
  ],
  "Daily Habits": [
    "Eat intentionally to stabilize energy.",
    "Prepare dinner.",
    "Keep home tidy.",
    "Care for Woolly Bear.",
    "Spend quality time with Lumina.",
    "While grass is getting established, water yard daily",
  ],
}

export const regenerate = action({
  args: {
    messageId: v.id("messages"),
  },
  handler: async (ctx, args) => {
    const message = await ctx.runQuery(api.messages.findById, {
      id: args.messageId,
    })

    if (!message) {
      throw new Error("Message not found")
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const localTimeString = formatInstant(
      getCurrentInstant(),
      "conversational date time",
    )

    const systemPrompt = `
      ## Overview
      ${overview}

      ## About the User
      ${BIOS.map((p) => ` - ${p}\n`).join("")}

      ## Planning
      ${planning.map((p) => ` - ${p}\n`).join("")}

      ## Information Check
      ${informationCheck.map((p) => ` - ${p}\n`).join("")}

      ## Emotion Management
      ${emotionManagement.map((p) => ` - ${p}\n`).join("")}

      ## Emotion Hacks
      ${emotionHacks.map((p) => ` - ${p}\n`).join("")}

      ## Time Awareness
      - The user's local time is ${localTimeString}
      ${timeAwareness.map((p) => ` - ${p}\n`).join("")}

      ## Goal Tracking
      ${goalTracking.map((p) => ` - ${p}\n`).join("")}

      ## Current Goals (JSON)
      ${JSON.stringify(currentGoals, null, 2)}
    `

    const input: ResponseInput = [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: message.text,
      },
    ]

    // console.debug("INPUT", input)

    const response = await openai.responses.create({
      model: "gpt-4o",
      input,
      store: false,
    })

    for (const output of response.output) {
      switch (output.type) {
        case "message": {
          const [content] = output.content
          if (content.type === "refusal") {
            throw new Error("Refusal")
          }

          const { blocks, text } = parseResponse(content.text)

          await ctx.runMutation(internal.responses.create, {
            text,
            blocks,
            replyingToMessageId: args.messageId,
            openAIResponseId: response.id,
          })

          break
        }
        case "function_call":
          console.log("function_call", output.name, output.arguments)
          break
        case "reasoning":
          console.log("reasoning", output.summary)
          break
        default:
          console.log(output.type, "output")
      }
    }

    // const responseId = await ctx.db.insert("responses", {
    //   messageId: args.messageId,
    //   text: response.output_text,
    //   receivedAt: getCurrentTime(),
    //   openAIResponseId: response.id,
    // })

    // return responseId
  },
})

function parseResponse(responseText: string) {
  const [text, blocksText] = responseText.split("-*-*-*-")

  let blocks: Block[] | undefined

  const result = z.array(blockSchema).safeParse(blocksText)

  if (result.success) {
    blocks = result.data
  }

  return { text, blocks }
}

export const create = internalMutation({
  args: {
    replyingToMessageId: v.id("messages"),
    text: v.string(),
    openAIResponseId: v.string(),
    blocks: v.optional(v.array(vBlock)),
  },
  handler: async (
    ctx,
    { replyingToMessageId, text, openAIResponseId, blocks },
  ) => {
    const responseId = await ctx.db.insert("responses", {
      replyingToMessageId,
      text,
      openAIResponseId,
      blocks,
      receivedAt: toUnix(getCurrentInstant()),
    })

    console.log({ text, blocks })
    await ctx.runMutation(api.messages.selectResponse, {
      messageId: replyingToMessageId,
      responseId,
    })

    return responseId
  },
})
