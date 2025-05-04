import { api } from "@convex/api"
import { useMutation } from "convex/react"
import { useRef, useState } from "react"
import { Button } from "~/components/Button"
import { ButtonGroup } from "~/components/ButtonGroup"
import { Dialog, useDialog } from "~/components/Dialog"
import { TextInput } from "~/components/TextInput"

export const EditGoalBinDialog = () => {
  const { closeDialog, setLoading } = useDialog("edit-goal-bin")
  const saveButtonRef = useRef<HTMLButtonElement>(null)
  const addGoalBin = useMutation(api.goals.addBin)
  const [binName, setBinName] = useState<string>("")

  const add = async () => {
    if (!binName) {
      throw new Error("No bin name")
    }

    setLoading()
    await addGoalBin({ name: binName })
    // await sleep(3000)
    setBinName("")
    console.log("closing dialog")
    closeDialog()
  }

  return (
    <Dialog id="edit-goal-bin" label="Add new goal bin dialog">
      <TextInput
        value={binName}
        placeholder="Enter a bin name"
        onChange={(name) => setBinName(name)}
        onEnterPress={() => {
          saveButtonRef.current?.focus()
          void add()
        }}
        autoFocus
      />
      <ButtonGroup>
        <Button
          flavor="primary"
          ref={saveButtonRef}
          onClick={() => {
            setLoading()
            void add()
          }}
        >
          Save
        </Button>
        <Button onClick={closeDialog}>Cancel</Button>
      </ButtonGroup>
    </Dialog>
  )
}
