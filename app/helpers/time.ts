import { Temporal } from "temporal-polyfill"

export function getCurrentInstant() {
  return Temporal.Now.instant()
}

export function toUnix(instant: Temporal.Instant): number {
  return instant.epochMilliseconds
}

type TimeFormat = "conversational date time"

export function formatInstant(
  instant: Temporal.Instant,
  format: TimeFormat,
): string {
  switch (format) {
    case "conversational date time":
      return instant.toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
      })
  }
}
