import { styled } from "@stitches/react"
import { createContext, useCallback, useContext, useReducer } from "react"
import { makeUninitializedContext } from "~/helpers/makeUninitializeContext"

type DialogContextState = {
  openById: Record<string, boolean>
  loadingById: Record<string, boolean>
}

type DialogContextAction =
  | {
      type: "open"
      dialogId: string
    }
  | {
      type: "close"
      dialogId: string
    }
  | {
      type: "setLoading"
      dialogId: string
      loading: boolean
    }

type DialogContextValue = [
  DialogContextState,
  React.Dispatch<DialogContextAction>,
]

const DialogContext = createContext(
  makeUninitializedContext<DialogContextValue>(
    "Cannot use DialogContext outside of a DialogProvider",
  ),
)

type DialogProps = {
  id: string
  label: string
  children: React.ReactNode
}

export const Dialog: React.FC<DialogProps> = ({ id, label, children }) => {
  const [state, dispatch] = useContext(DialogContext)

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      dispatch({ type: "close", dialogId: id })
      event.preventDefault()
    }
  }

  if (!state.openById[id]) {
    return null
  }

  return (
    <DialogContainer onKeyUp={handleKeyUp}>
      <DialogElement
        loading={state.loadingById[id]}
        role="dialog"
        aria-label={label}
      >
        {children}
      </DialogElement>
    </DialogContainer>
  )
}

const DialogContainer = styled("div", {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  overflowY: "auto",
  zIndex: 10,
  isolation: "isolate",
  padding: "2rem 0",
})

const DialogElement = styled("div", {
  backgroundColor: "white",
  borderRadius: "10px",
  padding: "1em",
  minWidth: "340px",
  maxWidth: "500px",
  margin: "auto",
  variants: {
    loading: {
      true: {
        filter: "contrast(30%) brightness(150%)",
        pointerEvents: "none",
      },
    },
  },
})

function dialogContextReducer(
  state: DialogContextState,
  action: DialogContextAction,
): DialogContextState {
  switch (action.type) {
    case "open":
      return {
        ...state,
        openById: { ...state.openById, [action.dialogId]: true },
      }
    case "close":
      return {
        ...state,
        openById: { ...state.openById, [action.dialogId]: false },
        loadingById: {
          ...state.loadingById,
          [action.dialogId]: false,
        },
      }
    case "setLoading":
      return {
        ...state,
        loadingById: {
          ...state.loadingById,
          [action.dialogId]: action.loading,
        },
      }
  }
}

type DialogProviderProps = {
  children: React.ReactNode
}

export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
  const value = useReducer(dialogContextReducer, {
    openById: {},
    loadingById: {},
  })

  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  )
}

/**
 *
 * @returns
 */
export function useDialog(id: string) {
  const [_, dispatch] = useContext(DialogContext)

  const openDialog = useCallback(
    () => dispatch({ type: "open", dialogId: id }),
    [dispatch, id],
  )

  const closeDialog = useCallback(
    () => dispatch({ type: "close", dialogId: id }),
    [dispatch, id],
  )

  const setLoading = useCallback(
    (loading = true) => dispatch({ type: "setLoading", dialogId: id, loading }),
    [dispatch, id],
  )

  return { openDialog, closeDialog, setLoading }
}
