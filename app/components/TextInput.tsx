import { styled } from "@stitches/react"

const TextInputElement = styled("input", {
  // border: "1px solid #665",
  // color: "#443",
  border: "1px solid #ddd",
  color: "#443",
  padding: "0.5em 1em",
  borderRadius: "0.25em",
  fontSize: "inherit",
  width: "100%",
})

type TextInputProps = {
  value: string | null | undefined
  onChange: (value: string) => void
  onEnterPress?: () => void
  autoFocus?: boolean
  placeholder?: string
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  onEnterPress,
  autoFocus,
  placeholder,
}) => (
  <TextInputElement
    value={value ?? ""}
    onChange={(event) => onChange(event.target.value)}
    onKeyDown={(event) => {
      if (event.key === "Enter") {
        onEnterPress?.()
        event.preventDefault()
      }
    }}
    autoFocus={autoFocus}
    placeholder={placeholder}
  />
)
