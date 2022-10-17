const key = {
  all: ["notifications"] as const,
  forCount: () => [...key.all, "forCount"] as const,
} as const

export default key
