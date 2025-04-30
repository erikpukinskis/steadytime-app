import { globalCss } from "@stitches/react"
import React from "react"

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

type DesignSystemProviderProps = {
  children: React.ReactNode
}

export const DesignSystemProvider: React.FC<DesignSystemProviderProps> = ({
  children,
}) => {
  globalStyles()

  return <div>{children}</div>
}
