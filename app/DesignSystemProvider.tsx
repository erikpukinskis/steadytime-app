import { globalCss } from "@stitches/react"
import React from "react"
import { DialogProvider } from "./components/Dialog"

const globalStyles = globalCss({
  body: {
    margin: "1em",
    fontFamily: "sans-serif",
    color: "#440",
    lineHeight: 1.5,
  },
  "*": {
    boxSizing: "border-box",
    "&:focus-visible": {
      outlineColor: "rgb(164, 240, 255, 0.65)",
      outlineWidth: "3px",
      outlineStyle: "solid",
      outlineOffset: "2px",
    },
  },
  "h1, h2, h3": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "0.75em",
    marginBottom: "0.25em",
    a: {
      marginLeft: "auto",
    },
  },
  a: {
    color: "#c7d",
  },
})

type DesignSystemProviderProps = {
  children: React.ReactNode
}

export const DesignSystemProvider: React.FC<DesignSystemProviderProps> = ({
  children,
}) => {
  globalStyles()

  return <DialogProvider>{children}</DialogProvider>
}
