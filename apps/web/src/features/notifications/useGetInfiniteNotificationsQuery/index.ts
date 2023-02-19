import { useSuspenseInfiniteQuery } from '@suspensive/react-query'
import { api } from '~/apis'
import key from '~/features/key'

const useGetInfiniteNotificationsQuery = () =>
  useSuspenseInfiniteQuery(
    key.notifications.all,
    ({ pageParam = { isFirst: true, lastId: null } }) =>
      api.notifications.getNotifications({ ...pageParam }).then(({ data }) => data),
    {
      getNextPageParam: (lastPage) => ({
        isFirst: false,
        lastId: lastPage.lastId,
      }),
    }
  )

export default useGetInfiniteNotificationsQuery
