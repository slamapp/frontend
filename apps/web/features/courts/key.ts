import { APICourt } from '@slam/types'
import { api } from '~/api'

const key = {
  all: ['courts'] as const,
  one: (courtId: APICourt['id']) => [...key.all, courtId] as const,
  oneFilter: (courtId: APICourt['id'], filter: Parameters<typeof api.courts.getCourtDetail>[1]) =>
    [...key.one(courtId), filter] as const,
} as const

export default key
