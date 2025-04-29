import { api } from "@convex/api"
import type { Id } from "@convex/dataModel"
import { styled, globalCss } from "@stitches/react"
import { useQuery, useMutation, useAction } from "convex/react"
import React, { useState } from "react"
import { Loading } from "./components/Loading"
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

const AgentResponse = styled("div", {})

const Chat = styled("div", {
  maxWidth: 768,
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "1em",
  alignItems: "flex-end",
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
  borderRadius: 20,
  border: "1px solid #ddc",
  color: "inherit",
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
    return <Loading />
  }

  console.log(messages)

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
          {response && <AgentResponse>{response.text}</AgentResponse>}
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
