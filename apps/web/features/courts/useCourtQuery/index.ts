import { UseSuspenseQueryOptions, useSuspenseQuery } from '@suspensive/react-query'
import { api } from '~/api'
import { key } from '~/features'
import { APICourt } from '~/types/domains/objects/court'

const useCourtQuery = (
  courtId: APICourt['id'],
  filter: Parameters<typeof api.courts.getCourtDetail>[1],
  options: Pick<
    UseSuspenseQueryOptions<Awaited<ReturnType<typeof api.courts.getCourtDetail>>['data']>,
    'onSuccess' | 'enabled'
  >
) =>
  useSuspenseQuery(
    key.courts.oneFilter(courtId, filter),
    () => api.courts.getCourtDetail(courtId, filter).then(({ data }) => data),
    options
  )

export default useCourtQuery
