import { Routes, Route } from "react-router"
import { BinsEditor } from "./pages/BinsEditor"
import { MainContent, Sidebar } from "~/components/Layout"
import { Chat } from "~/pages/Chat"
import { Goals } from "~/pages/Goals"

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/chat">
        <Route
          index
          element={
            <>
              <MainContent>
                <Chat />
              </MainContent>
              <Sidebar>
                <Goals />
              </Sidebar>
            </>
          }
        />
        <Route
          path="bins/edit"
          element={
            <>
              <MainContent>
                <Chat />
              </MainContent>
              <Sidebar>
                <BinsEditor />
              </Sidebar>
            </>
          }
        />
      </Route>
    </Routes>
  )
}
