import { styled } from "@stitches/react"

export const ChatInput = styled("textarea", {
  position: "fixed",
  bottom: "2em",
  maxWidth: 768,
  display: "block",
  resize: "none",
  width: "100%",
  boxSizing: "border-box",
  paddingBlock: "1em",
  paddingInline: "1.5em",
  height: "3.5em",
  lineHeight: "inherit",
  fontFamily: "inherit",
  fontSize: "inherit",
  borderRadius: "2em",
  border: "1px solid #ddc",
  color: "inherit",
  boxShadow: "0px 0px 1em 2em rgba(255,255,255,0.7)",
})
