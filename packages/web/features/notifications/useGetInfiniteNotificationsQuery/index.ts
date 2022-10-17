import { useInfiniteQuery } from "@tanstack/react-query"
import { api } from "~/api"
import key from "~/features/key"
import { getCookieToken } from "~/utils"

const useGetInfiniteNotificationsQuery = () =>
  useInfiniteQuery(
    [...key.notifications.all],
    ({ pageParam = { isFirst: true, lastId: null } }) =>
      api.notifications
        .getNotifications({ ...pageParam, size: 1 })
        .then(({ data }) => data),
    {
      getNextPageParam: (lastPage) => {
        return {
          isFirst: false,
          lastId: lastPage.lastId,
        }
      },
      enabled: !!getCookieToken(),
    }
  )

export default useGetInfiniteNotificationsQuery
