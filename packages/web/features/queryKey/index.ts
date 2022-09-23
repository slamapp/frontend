import type { APIUser } from "~/types/domains"

const courts = {
  all: ["courts"] as const,
} as const

const favorites = {
  all: ["favorites"] as const,
} as const

const follows = {
  all: ["follows"] as const,
} as const

const managements = {
  all: ["managements"] as const,
} as const

const notifications = {
  all: ["notifications"] as const,
} as const

const reservations = {
  all: ["reservations"] as const,
} as const

const users = {
  all: ["users"] as const,
  one: (userId: APIUser["id"]) => [...users.all, userId] as const,
  oneFollowings: (userId: APIUser["id"]) =>
    [...users.one(userId), "followings"] as const,
  myProfile: (userId: APIUser["id"]) =>
    [...users.one(userId), "myProfile"] as const,
  otherProfile: (userId: APIUser["id"]) =>
    [...users.one(userId), "otherProfile"] as const,
} as const

export const queryKey = {
  courts,
  favorites,
  follows,
  managements,
  notifications,
  reservations,
  users,
} as const
