import { styled } from "@stitches/react"
import React, { useContext, useReducer } from "react"
import { createPortal } from "react-dom"
import { makeUninitializedContext } from "~/helpers/makeUninitializeContext"

type LayoutProps = {
  children: React.ReactNode
  className?: string
}

/**
 * Renders the top level layout for the application.
 *
 * The main content and sidebar can be rendered independently of this component,
 * and their content will be rendered in the correct place via portals. Example:
 *
 *       <Layout>
 *         <MainContent>[primary chat, etc]</MainContent>
 *         <Sidebar>[goals, settings, etc]</Sidebar>
 *       </Layout>
 *
 * This allows us to independently render into the MainContent and Sidebar in
 * routes at any level of nesting. This is necessary because React Router
 * doesn't really support rendering into multiple Outlets that are siblings in
 * the Route tree.
 */
export const Layout = styled(
  ({ children, className }: LayoutProps) => {
    const [state, dispatch] = useReducer(layoutContextReducer, {
      mainElement: null,
      sidebarElement: null,
    })

    return (
      <div data-component="Layout" className={className}>
        <MainContentContainer
          ref={(element) => {
            if (state.mainElement !== element) {
              dispatch({ type: "setMainElement", element })
            }
          }}
        />
        <SidebarContainer
          ref={(element) => {
            if (state.sidebarElement !== element) {
              dispatch({ type: "setSidebarElement", element })
            }
          }}
        />
        <LayoutContext.Provider value={{ state, dispatch }}>
          {children}
        </LayoutContext.Provider>
      </div>
    )
  },
  {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    overflow: "hidden",
    gap: "2em",
  },
)

type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

const MainContentContainer = styled(
  ({ children, ...props }: DivProps) => (
    <div data-component="MainContentContainer" {...props}>
      {children}
    </div>
  ),
  {
    overflowY: "scroll",
  },
)

const SidebarContainer = styled(
  ({ children, ...props }: DivProps) => (
    <div data-component="SidebarContainer" {...props}>
      {children}
    </div>
  ),
  {
    width: "300px",
    position: "fixed",
    right: 0,
    padding: "1em",
    top: 0,
    backgroundColor: "white",
    minHeight: "100vh",
    borderLeft: "4px solid #f8f8f8",
    boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.1)",
  },
)

type MainContentProps = {
  children: React.ReactNode
}

export const MainContent: React.FC<MainContentProps> = ({ children }) => {
  const {
    state: { mainElement },
  } = useContext(LayoutContext)

  return mainElement ? createPortal(children, mainElement) : null
}

type SidebarProps = {
  children: React.ReactNode
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const {
    state: { sidebarElement },
  } = useContext(LayoutContext)

  return sidebarElement ? createPortal(children, sidebarElement) : null
}

type LayoutContextState = {
  mainElement: HTMLDivElement | null
  sidebarElement: HTMLDivElement | null
}

/**
 * The LayoutContext is used to track the DOM elements for the portal containers.
 */
const LayoutContext = React.createContext(
  makeUninitializedContext<{
    state: LayoutContextState
    dispatch: React.Dispatch<LayoutContextAction>
  }>("LayoutContext cannot be used outside of Layout"),
)

type LayoutContextAction =
  | {
      type: "setMainElement"
      element: HTMLDivElement | null
    }
  | {
      type: "setSidebarElement"
      element: HTMLDivElement | null
    }

function layoutContextReducer(
  state: LayoutContextState,
  action: LayoutContextAction,
): LayoutContextState {
  switch (action.type) {
    case "setMainElement":
      return { ...state, mainElement: action.element }
    case "setSidebarElement":
      return { ...state, sidebarElement: action.element }
  }
}
