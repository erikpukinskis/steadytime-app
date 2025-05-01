import { ConvexProvider, ConvexReactClient } from "convex/react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
import { Layout } from "./components/Layout"
import { DesignSystemProvider } from "./DesignSystemProvider"
import { Router } from "./Router"

const CONVEX_URL = import.meta.env.VITE_CONVEX_URL

if (!CONVEX_URL) {
  throw new Error("VITE_CONVEX_URL is not set")
}

const convex = new ConvexReactClient(CONVEX_URL)
const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)
  root.render(
    <BrowserRouter>
      <ConvexProvider client={convex}>
        <DesignSystemProvider>
          <Layout>
            <Router />
          </Layout>
        </DesignSystemProvider>
      </ConvexProvider>
    </BrowserRouter>,
  )
} else {
  throw new Error("Failed to find #root element")
}
