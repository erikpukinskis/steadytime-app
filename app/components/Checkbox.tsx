import { styled } from "@stitches/react"
import React from "react"

const CheckboxElement = styled("input", {
  variants: {
    inline: {
      true: {
        marginRight: "0.25em",
      },
    },
  },
})

type CheckboxProps = {
  checked: boolean
  inline?: boolean
  onChange: (checked: boolean) => void
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  inline = false,
  onChange,
}) => {
  return (
    <div>
      <CheckboxElement
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        inline={inline}
      />
    </div>
  )
}
