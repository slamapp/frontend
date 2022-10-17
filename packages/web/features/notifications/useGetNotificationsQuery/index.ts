import { useQuery } from "@tanstack/react-query"
import { api } from "~/api"
import key from "~/features/key"
import { getCookieToken } from "~/utils"

const useGetNotificationsQuery = () =>
  useQuery(
    [...key.notifications.forCount()],
    () =>
      api.notifications
        .getNotifications({ isFirst: true, size: 10, lastId: null })
        .then(({ data }) => data),
    {
      enabled: !!getCookieToken(),
    }
  )

export default useGetNotificationsQuery
