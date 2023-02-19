import { useSuspenseQuery } from '@suspensive/react-query'
import { api } from '~/apis'
import key from '~/features/key'

const useGetNotificationsQuery = () =>
  useSuspenseQuery(key.notifications.forCount(), () =>
    api.notifications.getNotifications({ isFirst: true, size: 10, lastId: null }).then(({ data }) => data)
  )

export default useGetNotificationsQuery
