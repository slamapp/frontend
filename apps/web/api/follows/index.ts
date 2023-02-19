import { APIFollower, APIFollowing, APIUser, CursorList, CursorListRequestOption } from '@slam/types'
import { http } from '~/api/core'

export default {
  getUserFollowings: (
    userId: APIUser['id'],
    { isFirst = false, lastId = null, size = 4 }: CursorListRequestOption<APIUser>
  ) =>
    http.get<CursorList<APIFollowing>>(`/follow/${userId}/followings`, {
      params: { isFirst, lastId, size },
    }),

  getUserFollowers: (
    userId: APIUser['id'],
    { isFirst = false, lastId = null, size = 4 }: CursorListRequestOption<APIUser>
  ) =>
    http.get<CursorList<APIFollower>>(`/follow/${userId}/followers`, {
      params: { isFirst, lastId, size },
    }),

  postFollow: ({ receiverId }: { receiverId: APIUser['id'] }) =>
    http.post<void>(`/notifications/follow`, {
      params: { receiverId },
    }),

  deleteFollow: ({ receiverId }: { receiverId: APIUser['id'] }) =>
    http.delete<void>(`/notifications/follow`, { params: { receiverId } }),
} as const
