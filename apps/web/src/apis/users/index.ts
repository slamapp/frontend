import { APICourt, APINotification, APIUser } from '@slam/types'
import { http } from '~/apis/core'

export default {
  getUserData: () => http.get<APIUser & { notifications: APINotification[] }>('/users/me'),

  getMyProfile: () =>
    http.get<
      APIUser & {
        followerCount: number
        followingCount: number
      }
    >('/users/myprofile'),

  getUserProfile: ({ id }: { id: APIUser['id'] }) =>
    http.get<
      APIUser & {
        favoriteCourts: Pick<APICourt, 'id' | 'name'>[]
        followerCount: number
        followingCount: number
        isFollowing: boolean
      }
    >(`/users/${id}`),

  updateMyProfile: (data: Pick<APIUser, 'nickname' | 'description' | 'proficiency' | 'positions'>) =>
    http.put<APIUser>('/users/myprofile', {
      data,
    }),

  updateMyProfileImage: (imageFile: File) => {
    const formData = new FormData()
    formData.append('profileImage', imageFile)

    return http.file.put<{ profileImage: APIUser['profileImage'] }>('/users/myprofile/image', { data: formData })
  },
} as const
