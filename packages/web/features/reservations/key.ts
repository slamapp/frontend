const key = {
  all: ["reservations"] as const,

  upcoming: () => [...key.all, "upcoming"] as const,

  expired: () => [...key.all, "expired"] as const,
} as const

export default key
