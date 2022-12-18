import { useSuspenseQuery } from "@suspensive/react-query"
import { api } from "~/api"
import key from "~/features/key"

const useCourtsQuery = (
  filter: Parameters<typeof api.courts.getCourtsByCoordsAndDate>[0]
) =>
  useSuspenseQuery(key.courts.all, () =>
    api.courts.getCourtsByCoordsAndDate(filter).then(({ data }) => data)
  )

export default useCourtsQuery
