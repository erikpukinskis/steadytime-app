import { styled } from "@stitches/react"
import { Link as ReactRouterLink } from "react-router"

type LinkProps = {
  to: string
  children: React.ReactNode
  className?: string
}

export const Link = styled(
  ({ to, children, className }: LinkProps) => {
    return (
      <ReactRouterLink className={className} to={to}>
        {children}
      </ReactRouterLink>
    )
  },
  {
    fontSize: "1rem",
    padding: "0.25em 1em",
    fontWeight: "normal",
    marginLeft: "auto",
    borderRadius: "0.25em",
  },
)
