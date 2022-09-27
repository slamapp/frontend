import type { APIUser } from "~/types/domains/objects"

const key = {
  all: ["users"] as const,
  one: (userId: APIUser["id"]) => [...key.all, userId] as const,
  oneFollowings: (userId: APIUser["id"]) =>
    [...key.one(userId), "followings"] as const,
  oneFollowers: (userId: APIUser["id"]) =>
    [...key.one(userId), "followers"] as const,
  myProfile: (userId: APIUser["id"]) =>
    [...key.one(userId), "myProfile"] as const,
  otherProfile: (userId: APIUser["id"]) =>
    [...key.one(userId), "otherProfile"] as const,
} as const

export default key
