import type { APIUser } from '@slam/types'
import { useSuspenseQuery } from '@suspensive/react-query'
import { api } from '~/apis'
import { key } from '~/features'

const useUserProfileQuery = ({ userId }: { userId: APIUser['id'] }) =>
  useSuspenseQuery(key.users.otherProfile(userId), () =>
    api.users.getUserProfile({ id: userId }).then(({ data }) => data)
  )

export default useUserProfileQuery
