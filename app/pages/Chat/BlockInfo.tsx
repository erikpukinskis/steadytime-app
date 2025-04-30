import { styled } from "@stitches/react"
import type { Block } from "convex/prompts"
import { formatDuration } from "~/helpers/time"

type BlockInfoProps = Pick<
  Block,
  "start" | "end" | "title" | "guidance" | "transition"
> & {
  className?: string
}

export const BlockInfo = styled(
  ({ start, end, title, guidance, transition, className }: BlockInfoProps) => {
    return (
      <div className={className}>
        <h3>
          {formatDuration({ start, end })} — {title}
        </h3>
        <ul>
          {guidance.map((guidance) => (
            <li key={guidance}>{guidance}</li>
          ))}
        </ul>
        {transition && <b>Transition: {transition}</b>}
      </div>
    )
  },
  {},
)
