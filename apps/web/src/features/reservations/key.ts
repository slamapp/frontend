import type { APICourt } from '@slam/types'

const key = {
  all: ['reservations'] as const,

  upcoming: () => [...key.all, 'upcoming'] as const,

  expired: () => [...key.all, 'expired'] as const,

  court: (courtId: APICourt['id']) => [...key.all, 'courts', courtId] as const,
} as const

export default key
