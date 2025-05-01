import { api } from "@convex/api"
import { useQuery } from "convex/react"
import { useState } from "react"
import { Button } from "~/components/Button"
import { Link } from "~/components/Link"
import { Loading } from "~/components/Loading"

export const BinsEditor = () => {
  const bins = useQuery(api.goals.listCurrentGoalBins)
  const [loading, setLoading] = useState(false)

  if (!bins) {
    return <Loading size="fullscreen" />
  }

  const handleClick = () => {
    setLoading((loading) => !loading)

    setTimeout(() => {
      setLoading((loading) => !loading)
    }, 3000)
  }

  return (
    <>
      <h2>
        Edit Bins
        <Link to="/chat">Back</Link>
      </h2>
      <Button onClick={handleClick} loading={loading}>
        Add Bin
      </Button>
    </>
  )
}
