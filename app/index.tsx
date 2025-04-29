import { ConvexProvider, ConvexReactClient } from "convex/react"
import { createRoot } from "react-dom/client"
import App from "./App"

const CONVEX_URL = import.meta.env.VITE_CONVEX_URL

if (!CONVEX_URL) {
  throw new Error("VITE_CONVEX_URL is not set")
}

const convex = new ConvexReactClient(CONVEX_URL)
const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)
  root.render(
    <ConvexProvider client={convex}>
      <App />
    </ConvexProvider>,
  )
} else {
  throw new Error("Failed to find #root element")
}
