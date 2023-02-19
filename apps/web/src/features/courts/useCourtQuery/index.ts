import type { APICourt } from '@slam/types'
import type { UseSuspenseQueryOptions } from '@suspensive/react-query'
import { useSuspenseQuery } from '@suspensive/react-query'
import { api } from '~/apis'
import { key } from '~/features'

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
