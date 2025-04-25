import { styled } from "@stitches/react"
import { IconReload } from "@tabler/icons-react"

const ICON_COMPONENTS = {
  reload: IconReload,
}

export type IconName = keyof typeof ICON_COMPONENTS

type IconButtonProps = {
  icon: IconName
  alt: string
  className?: string
  onClick?: () => void
}

export const IconButton = styled(
  ({ className, icon, onClick, alt }: IconButtonProps) => {
    const IconComponent = ICON_COMPONENTS[icon]
    return (
      <button className={className} aria-label={alt} onClick={onClick}>
        <IconComponent />
      </button>
    )
  },
  {
    background: "none",
    border: "none",
    padding: 0,
    margin: 0,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "inherit",
  }
)
