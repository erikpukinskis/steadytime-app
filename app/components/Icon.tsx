import { styled } from "@stitches/react"
import { IconGripVertical, IconReload, IconTrash } from "@tabler/icons-react"

export const ICON_COMPONENTS = {
  reload: IconReload,
  grip: IconGripVertical,
  trash: IconTrash,
}

export type IconName = keyof typeof ICON_COMPONENTS

type IconProps = {
  icon: IconName
  alt: string
  className?: string
}

export const Icon = styled(({ className, icon, alt }: IconProps) => {
  const IconComponent = ICON_COMPONENTS[icon]
  return (
    <IconComponent
      width={20}
      height={20}
      className={className}
      aria-label={alt}
    />
  )
}, {})
