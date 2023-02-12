import { APICourt } from '~/types/domains/objects'

const key = {
  all: ['address'] as const,
  byPosition: (position: Pick<APICourt, 'latitude' | 'longitude'>) => [...key.all, position] as const,
} as const

export default key
