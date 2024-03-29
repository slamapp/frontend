import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { api } from '~/apis'
import { key } from '~/features'

const useCurrentUserQuery = (
  options?: Pick<UseQueryOptions<Awaited<ReturnType<typeof api.users.getMyProfile>>['data']>, 'onSuccess'>
) => {
  return useQuery(key.users.currentUser(), () => api.users.getUserData().then(({ data }) => data), {
    ...options,
  })
}

export default useCurrentUserQuery
