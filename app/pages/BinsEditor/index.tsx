import { api } from "@convex/api"
import type { Id } from "@convex/dataModel"
import { useMutation, useQuery } from "convex/react"
import React from "react"
import { EditGoalBinDialog } from "./EditGoalBinDialog"
import { Button } from "~/components/Button"
import { ButtonGroup } from "~/components/ButtonGroup"
import { Card } from "~/components/Card"
import { CardGroup } from "~/components/CardGroup"
import { useDialog } from "~/components/Dialog"
import { IconButton } from "~/components/IconButton"
import { LinkButton } from "~/components/LinkButton"
import { Loading } from "~/components/Loading"

export const BinsEditor: React.FC = () => {
  const bins = useQuery(api.goals.listCurrentGoalBins)
  const { openDialog } = useDialog("edit-goal-bin")
  const deleteGoalBin = useMutation(api.goals.deleteBin)

  if (!bins) {
    return <Loading size="fullscreen" />
  }

  const deleteBinHandler = (binId: Id<"goalBins">) => async () => {
    await deleteGoalBin({ binId })
  }

  return (
    <>
      <h2>Edit Bins</h2>
      <EditGoalBinDialog />
      <CardGroup>
        {bins.map((bin) => (
          <Card horizontal key={bin._id}>
            {/* <Icon icon="grip" alt="drag handle" /> */}
            <div>{bin.name}</div>
            <IconButton
              icon="trash"
              alt="delete"
              stick="right"
              onClick={deleteBinHandler(bin._id)}
            />
          </Card>
        ))}
      </CardGroup>
      <ButtonGroup>
        <Button onClick={openDialog}>Add Bin</Button>
        <LinkButton to="/chat">Done</LinkButton>
      </ButtonGroup>
    </>
  )
}
