import { useSuspenseInfiniteQuery } from '@suspensive/react-query'
import { api } from '~/api'
import key from '~/features/key'
import { APIUser } from '~/types/domains/objects'

const useUserFollowingInfiniteQuery = (userId: APIUser['id']) =>
  useSuspenseInfiniteQuery(
    key.users.oneFollowings(userId),
    ({ pageParam = { isFirst: true, lastId: null } }) =>
      api.follows.getUserFollowings(userId, pageParam).then(({ data }) => data),
    {
      getNextPageParam: (lastPage) => ({
        isFirst: false,
        lastId: lastPage.lastId,
      }),
    }
  )

export default useUserFollowingInfiniteQuery
