import type { APIUser } from '@slam/types'

const key = {
  all: ['users'] as const,

  currentUser: () => [...key.all, 'currentUser'] as const,

  myProfile: () => [...key.all, 'myProfile'] as const,

  one: (userId: APIUser['id']) => [...key.all, userId] as const,

  oneFollowings: (userId: APIUser['id']) => [...key.one(userId), 'followings'] as const,

  oneFollowers: (userId: APIUser['id']) => [...key.one(userId), 'followers'] as const,

  otherProfile: (userId: APIUser['id']) => [...key.one(userId), 'otherProfile'] as const,
} as const

export default key
