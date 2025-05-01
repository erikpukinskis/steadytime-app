import { api } from "@convex/api"
import type { Id } from "@convex/dataModel"
import { styled, globalCss } from "@stitches/react"
import type { Block } from "convex/prompts"
import { useQuery, useMutation, useAction } from "convex/react"
import React, { useState } from "react"
import Markdown from "react-markdown"
import { Loading } from "./components/Loading"
import { ErrorBoundary } from "./ErrorBoundary"
import { formatDuration } from "./helpers/time"
import { IconButton } from "~/components/IconButton"

const globalStyles = globalCss({
  body: {
    margin: "1em",
    fontFamily: "sans-serif",
    color: "#440",
    lineHeight: 1.5,
  },
  "*": {
    boxSizing: "border-box",
    ":focus": {
      outlineColor: "#8ca",
    },
  },
})

const SentMessage = styled("div", {
  maxWidth: 500,
  marginLeft: "auto",
  background: "#eee",
  padding: 10,
  borderRadius: 10,
})

type AgentResponseProps = {
  text: string
  blocks?: Block[]
  className?: string
}

const AgentResponse = styled(
  ({ text, blocks, className }: AgentResponseProps) => {
    return (
      <div className={className}>
        <Markdown>{text}</Markdown>
        <ErrorBoundary message="Could not parse blocks">
          {blocks && (
            <BlockInfoGroup>
              {blocks.map((block) => (
                <BlockInfo key={block.start} {...block} />
              ))}
            </BlockInfoGroup>
          )}
        </ErrorBoundary>
      </div>
    )
  },
  {},
)

const BlockInfoGroup = styled("div", {
  // display: "flex",
  // flexDirection: "column",
  // gap: "1em",
  // maxWidth: 500,
})

type BlockInfoProps = Pick<
  Block,
  "start" | "end" | "title" | "guidance" | "transition"
> & {
  className?: string
}

const BlockInfo = styled(
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
  {
    // border: "1px solid #bbf",
    // boxShadow: "0px 2px 6px 0 rgba(0, 0, 0, 0.1)",
    // padding: "0em 1em 1em 1em",
    // borderRadius: "1em",
    // color: "#337",
  },
)

const Chat = styled("div", {
  maxWidth: 768,
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "1em",
  alignItems: "flex-end",
  paddingBottom: "10em",
})

const Textarea = styled("textarea", {
  position: "fixed",
  bottom: "2em",
  maxWidth: 768,
  display: "block",
  resize: "none",
  width: "100%",
  boxSizing: "border-box",
  paddingBlock: "1em",
  paddingInline: "1.25em",
  height: "3.5em",
  lineHeight: "inherit",
  fontFamily: "inherit",
  fontSize: "inherit",
  borderRadius: "1em",
  border: "1px solid #ddc",
  color: "inherit",
  boxShadow: "0px 0px 1em 2em rgba(255,255,255,0.7)",
})

export default function App() {
  globalStyles()
  const [message, setMessage] = useState("")
  const [placeholder, setPlaceholder] = useState("How's it going?")

  const messages = useQuery(api.messages.getConversation)
  const sendMessage = useMutation(api.messages.send)
  const regenerate = useAction(api.responses.regenerate)

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      void sendMessage({ text: message })
      setMessage("")
      setPlaceholder("")
    }
  }

  const regenerateMessage = (id: Id<"messages">) => () => {
    return void regenerate({ messageId: id })
  }

  if (!messages) {
    return <Loading fullscreen />
  }

  return (
    <Chat>
      {messages.map(({ _id, text, response }) => (
        <React.Fragment key={_id}>
          <SentMessage>
            {text}{" "}
            <IconButton
              icon="reload"
              alt="Regenerate"
              onClick={regenerateMessage(_id)}
            />
          </SentMessage>
          {response && <AgentResponse {...response} />}
        </React.Fragment>
      ))}
      <Textarea
        placeholder={placeholder}
        autoFocus
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={handleKeyPress}
        onBlur={() => setPlaceholder("How's it going?")}
      />
    </Chat>
  )
}
