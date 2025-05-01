import { api } from "@convex/api"
import { useQuery } from "convex/react"
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
        <Link to="/chat/bins/edit">Edit</Link>
      </h2>
      {bins.map((bin) => (
        <div key={bin._id}>
          <h3>{bin.text}</h3>
          <ul>
            {bin.goals.map((goal) => (
              <li key={goal._id}>{goal.text}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}
