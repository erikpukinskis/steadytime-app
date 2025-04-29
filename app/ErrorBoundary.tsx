import { styled } from "@stitches/react"
import React from "react"

const ErrorMessage = styled("div", {
  color: "#c63",
  border: "1px solid #c63",
  padding: "1em",
  borderRadius: "0.5em",
  maxWidth: 500,
})

interface Props {
  message: string
  children: React.ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <ErrorMessage>{this.props.message}</ErrorMessage>
    }

    return this.props.children
  }
}
