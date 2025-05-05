import { styled } from "@stitches/react"
import type { IconName } from "./Icon"
import { Icon } from "./Icon"

type IconButtonProps = {
  icon: IconName
  alt: string
  stick?: "right"
  className?: string
  onClick?: () => void
}

export const IconButton = styled(
  ({ className, icon, onClick, alt }: IconButtonProps) => {
    return (
      <button className={className} aria-label={alt} onClick={onClick}>
        <Icon icon={icon} alt={alt} />
      </button>
    )
  },
  {
    background: "none",
    border: "1px solid transparent",
    padding: "0.5em",
    margin: "-0.5em",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "inherit",
    borderRadius: 999,
    verticalAlign: "middle",
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
    "&:active": {
      borderColor: "#a6f0ff",
    },
    variants: {
      stick: {
        right: {
          marginLeft: "auto",
        },
      },
    },
  },
)
