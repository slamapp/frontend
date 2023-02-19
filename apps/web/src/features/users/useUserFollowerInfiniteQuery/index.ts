import type { APIUser } from '@slam/types'
import { useSuspenseInfiniteQuery } from '@suspensive/react-query'
import { api } from '~/apis'
import key from '~/features/key'

const useUserFollowerInfiniteQuery = (userId: APIUser['id']) =>
  useSuspenseInfiniteQuery(
    key.users.oneFollowers(userId),
    ({ pageParam = { isFirst: true, lastId: null } }) =>
      api.follows.getUserFollowers(userId, pageParam).then(({ data }) => data),
    {
      getNextPageParam: (lastPage) => ({
        isFirst: false,
        lastId: lastPage.lastId,
      }),
    }
  )

export default useUserFollowerInfiniteQuery
