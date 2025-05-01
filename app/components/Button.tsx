import { styled } from "@stitches/react"
import { Loading } from "./Loading"

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  loading?: boolean
}

export const Button = ({ children, onClick, loading }: ButtonProps) => {
  return (
    <ButtonElement data-component="Button" onClick={onClick} loading={loading}>
      {children}
      {loading && <Loading size="small" />}
    </ButtonElement>
  )
}

export const ButtonElement = styled("button", {
  border: "1px solid #ddd",
  color: "#656",
  backgroundColor: "transparent",
  padding: "0.5em 1em",
  borderRadius: "0.25em",
  cursor: "pointer",
  fontSize: "inherit",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "0.5em",
  "&:hover": {
    borderTopColor: "#eee",
    transform: "translateY(-1px)",
    borderBottomWidth: "2px",
    outlineOffsetTop: "1px",
  },
  "&:active": {
    borderColor: "#a6f0ff",
    borderBottomWidth: "1px",
    transform: "none",
  },
  variants: {
    loading: {
      true: {
        borderColor: "#a6f0ff",
        color: "#a6f0ff",
        pointerEvents: "none",
      },
    },
  },
})
