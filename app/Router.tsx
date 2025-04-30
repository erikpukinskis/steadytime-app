import { Routes, Route } from "react-router"
import { Chat } from "~/pages/Chat"

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Chat />} />
    </Routes>
  )
}
