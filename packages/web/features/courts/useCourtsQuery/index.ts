import type { UseQueryOptions } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import { api } from "~/api"
import { queryKey } from "~/features/queryKey"

const useCourtsQuery = (
  filter: Parameters<typeof api.courts.getCourtsByCoordsAndDate>[0],
  options?: UseQueryOptions<
    Awaited<ReturnType<typeof api.courts.getCourtsByCoordsAndDate>>["data"]
  >
) => {
  return useQuery<
    Awaited<ReturnType<typeof api.courts.getCourtsByCoordsAndDate>>["data"]
  >(
    queryKey.courts.all,
    async () => {
      const { data } = await api.courts.getCourtsByCoordsAndDate(filter)

      return data
    },
    options
  )
}
export default useCourtsQuery
