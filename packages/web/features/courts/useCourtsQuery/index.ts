import type { UseQueryOptions } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import { api } from "~/api"
import key from "~/features/key"

const useCourtsQuery = (
  filter: Parameters<typeof api.courts.getCourtsByCoordsAndDate>[0],
  options?: Pick<
    UseQueryOptions<
      Awaited<ReturnType<typeof api.courts.getCourtsByCoordsAndDate>>["data"]
    >,
    "enabled"
  >
) =>
  useQuery(
    key.courts.all,
    () => api.courts.getCourtsByCoordsAndDate(filter).then(({ data }) => data),
    options
  )

export default useCourtsQuery
