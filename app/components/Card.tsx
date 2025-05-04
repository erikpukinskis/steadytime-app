import { styled } from "@stitches/react"

export const Card = styled("div", {
  backgroundColor: "white",
  borderRadius: "0.25em",
  border: "1px solid #eee",
  padding: "0.5em",
  boxShadow: "0px 3px 1px 0px rgba(0,0,0,0.03)",
  variants: {
    horizontal: {
      true: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      },
    },
  },
})
