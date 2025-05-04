import { api } from "@convex/api"
import { useQuery } from "convex/react"
import { Checklist } from "~/components/Checklist"
import { Link } from "~/components/Link"
import { Loading } from "~/components/Loading"

export const Goals: React.FC = () => {
  const bins = useQuery(api.goals.listCurrentGoalBins)

  if (!bins) {
    return <Loading size="fullscreen" />
  }

  return (
    <>
      <h2>
        Current Goals
        <Link to="/chat/bins/edit">Edit Bins</Link>
      </h2>
      {bins.map((bin) => (
        <div key={bin._id}>
          <h3>{bin.name}</h3>
          <Checklist
            items={bin.goals}
            getId={(goal) => goal._id}
            getLabel={(goal) => goal.text}
            getChecked={(goal) => goal.completedAt !== undefined}
            onAdd={(item) => {}}
            onRemove={(item) => {}}
            onRename={(item, newName) => {}}
          />
        </div>
      ))}
    </>
  )
}
