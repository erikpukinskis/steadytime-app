import { styled, globalCss } from "@stitches/react"
import { useState } from "react"

const globalStyles = globalCss({
  body: {
    margin: 20,
    fontFamily: "sans-serif",
  },
})

const Readable = styled("div", {
  maxWidth: 768,
  margin: "0 auto",
})

const Textarea = styled("textarea", {
  resize: "none",
  width: "100%",
  paddingBlock: 15,
  paddingInline: 20,
  fontFamily: "inherit",
  fontSize: "inherit",
  boxSizing: "border-box",
  borderRadius: 20,
  border: "1px solid #888",
})

export default function App() {
  globalStyles()
  const [message, setMessage] = useState(
    "Good morning! Not sure what I should be doing."
  )
  const [placeholder, setPlaceholder] = useState("How's it going?")

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      setMessage("")
      setPlaceholder("")
    }
  }

  return (
    <Readable>
      <Textarea
        placeholder={placeholder}
        autoFocus
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={handleKeyPress}
        onBlur={() => setPlaceholder("How's it going?")}
      />
    </Readable>
  )
}
