import { useInfiniteQuery } from "@tanstack/react-query"
import { api } from "~/api"
import key from "~/features/key"
import { getLocalToken } from "~/utils"

const useGetInfiniteNotificationsQuery = () =>
  useInfiniteQuery(
    [...key.notifications.all],
    ({ pageParam = { isFirst: true, lastId: null } }) =>
      api.notifications
        .getNotifications({ ...pageParam, size: 2 })
        .then(({ data }) => data),
    {
      getNextPageParam: (lastPage) => ({
        isFirst: false,
        lastId: lastPage.lastId,
      }),
      enabled: !!getLocalToken(),
    }
  )

export default useGetInfiniteNotificationsQuery
