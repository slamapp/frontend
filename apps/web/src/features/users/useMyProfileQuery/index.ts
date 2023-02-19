import { useSuspenseQuery } from '@suspensive/react-query'
import { api } from '~/apis'
import { key } from '~/features'

const useMyProfileQuery = () =>
  useSuspenseQuery(key.users.myProfile(), () => api.users.getMyProfile().then(({ data }) => data))

export default useMyProfileQuery
