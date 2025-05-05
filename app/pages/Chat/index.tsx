import { api } from "@convex/api"
import type { Id } from "@convex/dataModel"
import { styled } from "@stitches/react"
import type { Block } from "convex/prompts"
import { useQuery, useMutation, useAction } from "convex/react"
import React, { useState } from "react"
import Markdown from "react-markdown"
import { BlockInfo } from "./BlockInfo"
import { ChatInput } from "./ChatInput"
import { ErrorBoundary } from "~/components/ErrorBoundary"
import { IconButton } from "~/components/IconButton"
import { Loading } from "~/components/Loading"

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
          {blocks &&
            blocks.map((block) => <BlockInfo key={block.start} {...block} />)}
        </ErrorBoundary>
      </div>
    )
  },
  {},
)

const ChatContainer = styled("div", {
  maxWidth: 768,
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "1em",
  alignItems: "flex-end",
  paddingBottom: "10em",
})

export const Chat: React.FC = () => {
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
    return <Loading size="fullscreen" />
  }

  return (
    <ChatContainer>
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
      <ChatInput
        placeholder={placeholder}
        autoFocus
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={handleKeyPress}
        onBlur={() => setPlaceholder("How's it going?")}
      />
    </ChatContainer>
  )
}
