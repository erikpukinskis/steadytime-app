import { styled } from "@stitches/react"
import { Link } from "react-router"
import { buttonStyles, type SharedButtonProps } from "./Button"

type LinkButtonProps = SharedButtonProps & {
  to: string
}

export const LinkButton = ({
  children,
  to,
  disabled,
  flavor = "neutral",
}: LinkButtonProps) => {
  return (
    <LinkButtonElement
      to={to}
      data-component="LinkButton"
      disabled={disabled}
      flavor={flavor}
    >
      {children}
    </LinkButtonElement>
  )
}

const LinkButtonElement = styled(Link, buttonStyles, {
  textDecoration: "none",
})
