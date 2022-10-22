import type { APICourt } from "~/types/domains/objects/court"

const key = {
  all: ["reservations"] as const,

  upcoming: () => [...key.all, "upcoming"] as const,

  expired: () => [...key.all, "expired"] as const,

  court: (courtId: APICourt["id"]) => [...key.all, "courts", courtId] as const,
} as const

export default key
