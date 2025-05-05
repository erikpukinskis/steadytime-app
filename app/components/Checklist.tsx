import { styled } from "@stitches/react"
import type { ContentBlock } from "draft-js"
import {
  Editor,
  EditorState,
  ContentState,
  CompositeDecorator,
  Modifier,
  SelectionState,
} from "draft-js"
import "draft-js/dist/Draft.css"
import { useState } from "react"
import { Checkbox } from "~/components/Checkbox"

const ChecklistContainer = styled("div", {
  "& .public-DraftStyleDefault-block": {
    // borderBottom: "1px solid blue",
  },
})

type ChecklistItemEntityData = {
  checked: boolean
  text?: string
}

const checklistDecorator = new CompositeDecorator([
  {
    strategy: (
      contentBlock: ContentBlock,
      callback: (start: number, end: number) => void,
      contentState: ContentState,
    ) => {
      const entityKey = contentBlock.getEntityAt(0)
      if (entityKey) {
        const entity = contentState.getEntity(entityKey)
        if (entity.getType() === "CHECKLIST-ITEM") {
          callback(0, contentBlock.getLength())
        }
      }
    },
    component: ({
      contentState,
      entityKey,
      children,
    }: {
      contentState: ContentState
      entityKey: string
      children: React.ReactNode
    }) => {
      const entity = contentState.getEntity(entityKey)
      const data = entity.getData() as ChecklistItemEntityData

      return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Checkbox
            inline
            checked={data.checked}
            onChange={() => {
              contentState.mergeEntityData(entityKey, {
                checked: !data.checked,
              })
            }}
          />
          <span>{children}</span>
        </div>
      )
    },
  },
])

type ChecklistProps<T> = {
  items: T[]
  getId: (item: T) => string
  getLabel: (item: T) => string
  getChecked: (item: T) => boolean
  onAdd: (item: T) => void
  onRemove: (item: T) => void
  onRename: (item: T, newName: string) => void
}

export function Checklist<T>({
  items,
  getId,
  getLabel,
  getChecked,
  onAdd,
  onRemove,
  onRename,
}: ChecklistProps<T>) {
  const [editorState, setEditorState] = useState(() => {
    const contentState = addChecklistItems(ContentState.createFromText(""))

    return EditorState.createWithContent(contentState, checklistDecorator)
  })

  /**
   * I want to fire off all of these schmancy semantic events when the editor
   * state changes. But as a point of fact, I don't actually need to store the
   * individual goals as rows. I can just store the entire editor state.
   *
   * Although it does get a little squirrely when I need to figure out which
   * items are checked. Not a huge deal—I would just ask for the entity on the
   * block and see if checked is true or false.
   *
   * But if I fire off fine-grained events then I can just model that nicely in
   * the database. Hmm.
   */
  function fireCallback(editorState: EditorState) {
    switch (editorState.getLastChangeType()) {
      case "change-block-data":
      case "change-block-type":
      case "change-inline-style":
      case "move-block": // not sure how to get this? copy/paste? drag/drop?
        throw new Error(
          `We don't expect ${editorState.getLastChangeType()} changes to happen?`,
        )
      case "adjust-depth": // They pressed tab. Do nothing.
      case "redo": // Supposedly not needed? Assuming we will get the actual change separately.
      case "undo": // Supposedly not needed? Assuming we will get the actual change separately.
      case "spellcheck-change": // Supposedly not needed? Assuming we will get the actual change separately.
      case "apply-entity": // Not sure why this happens. But it does. Maybe entities are getting removed?
        break
      case "backspace-character":
        // TODO: Update the current item, delete the current item, or merge with the the previous item
        break
      case "delete-character":
        // TODO: Update the current item, delete the current item, or merge with the next item
        break
      case "insert-characters":
        // TODO: Create or update the current block
        break
      case "insert-fragment":
        // TODO: update current block and/or create one or more new items
        break
      case "remove-range":
        // TODO: update 0, 1, or 2 items and/or delete 1 or more items
        break
      case "split-block":
        // TODO: update an item and/or create a new item
        break
    }
  }

  return (
    <ChecklistContainer data-component="Checklist">
      <Editor
        editorState={editorState}
        onChange={(editorState) => {
          fireCallback(editorState)

          const selection = editorState.getSelection()
          const contentState = addChecklistItems(
            editorState.getCurrentContent(),
          )
          const newEditorState = EditorState.push(
            editorState,
            contentState,
            "apply-entity",
          )
          setEditorState(EditorState.forceSelection(newEditorState, selection))
        }}
      />
    </ChecklistContainer>
  )
}

function addChecklistItems(contentState: ContentState) {
  const blocks = contentState.getBlockMap()

  blocks.forEach((block) => {
    if (!block) return

    const key = block.getKey()
    const text = block.getText()
    let blockLength = block.getLength()

    if (text === "") {
      const selection = SelectionState.createEmpty(key).merge({
        anchorOffset: 0,
        focusOffset: 0,
      })

      // Insert a zero-width space to make the block non-empty
      contentState = Modifier.insertText(contentState, selection, "\u200B")
      blockLength = 1
    }

    // Check if block already has a checklist item entity
    const entityKey = block.getEntityAt(0)

    if (!entityKey) {
      // Create new checklist item entity if none exists
      const entityKey = contentState
        .createEntity("CHECKLIST-ITEM", "MUTABLE", {
          checked: false,
        })
        .getLastCreatedEntityKey()

      // Apply entity to the entire block
      const selection = SelectionState.createEmpty(key).merge({
        anchorOffset: 0,
        focusOffset: blockLength,
      })

      contentState = Modifier.applyEntity(contentState, selection, entityKey)
    }
  })

  return contentState
}
