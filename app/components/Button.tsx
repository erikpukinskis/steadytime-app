import { styled, css } from "@stitches/react"
import { forwardRef } from "react"

export type SharedButtonProps = {
  children: React.ReactNode
  // loading?: boolean
  disabled?: boolean
  flavor?: "primary" | "neutral"
}

type ButtonProps = SharedButtonProps & {
  onClick?: () => void
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      onClick,
      // loading,
      disabled,
      flavor = "neutral",
    },
    ref,
  ) {
    return (
      <ButtonElement
        ref={ref}
        data-component="Button"
        onClick={onClick}
        // loading={loading}
        disabled={disabled}
        flavor={flavor}
      >
        {children}
        {/* {loading && <Loading size="small" />} */}
      </ButtonElement>
    )
  },
)

export const buttonStyles = css({
  borderWidth: 1,
  borderStyle: "solid",
  padding: "0.5em 1em",
  borderRadius: "0.5em",
  cursor: "pointer",
  fontSize: "inherit",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "0.5em",
  "&:hover": {
    marginTop: "-1px",
    borderTopColor: "#eee",
    borderBottomWidth: "2px",
    outlineOffsetTop: "1px",
  },
  "&:active": {
    marginTop: "0px",
    borderColor: "#a6f0ff",
    borderBottomWidth: "1px",
    transform: "none",
  },

  variants: {
    // loading: {
    //   true: {
    //     borderColor: "#a6f0ff",
    //     color: "#a6f0ff",
    //     pointerEvents: "none",
    //   },
    // },
    disabled: {
      true: {
        opacity: 0.5,
        pointerEvents: "none",
        color: "#998",
      },
    },
    flavor: {
      primary: {
        backgroundColor: "#4cd",
        color: "#fff",
        borderColor: "#3bc",
        "&:hover": {
          borderTopColor: "#4cd",
        },
        "&:active": {
          borderColor: "#a6f0ff",
        },
      },
      neutral: {
        backgroundColor: "transparent",
        color: "inherit",
        borderColor: "#ddd",
        "&:hover": {
          borderTopColor: "#eee",
        },
        "&:active": {
          borderColor: "#a6f0ff",
        },
      },
    },
  },
})

const ButtonElement = styled("button", buttonStyles)
