import { Temporal } from "temporal-polyfill"

export function getCurrentInstant() {
  return Temporal.Now.instant()
}

export function toUnix(instant: Temporal.Instant): number {
  return instant.epochMilliseconds
}

type TimeFormat = "conversational"

export function formatInstant(
  instant: Temporal.Instant,
  format: TimeFormat,
): string {
  switch (format) {
    case "conversational":
      return instant.toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
      })
  }
}

type FormatDurationArgs = {
  start: string
  end: string
}

/**
 * @param start a time string in military time format (HH:MM)
 * @param end a time string in military time format (HH:MM)
 * @returns a string representing the time range, formatted for the locale, e.g. "H:MMam - H:MMpm"
 */
export function formatDuration({ start, end }: FormatDurationArgs): string {
  return `${militaryTimeToLocaleString(start)}—${militaryTimeToLocaleString(end)}`
}

function militaryTimeToLocaleString(time: string) {
  return Temporal.PlainTime.from(time)
    .toLocaleString("en-US", {
      timeStyle: "short",
    })
    .toLocaleLowerCase()
    .replace(" ", "")
}
