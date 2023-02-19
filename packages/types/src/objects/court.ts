import type { Keyof } from '@slam/utility-types'
import type { Default } from '../abstracts'

export interface APICourt extends Default {
  name: string
  latitude: number
  longitude: number
  image: string | null
  basketCount: number
  texture: Keyof<typeof textureType>
}

export const textureType = {
  RUBBER: '고무',
  URETHANE: '우레탄',
  ASPHALT: '아스팔트',
  SOIL: '흙',
  CONCRETE: '콘크리트',
  ETC: '기타',
} as const

export type Coord = [APICourt['latitude'], APICourt['longitude']]
