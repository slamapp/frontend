import type { Keyof } from '@slam/utility-types'
import type { APICourt } from './court'
import type { Create } from '../abstracts'

export type APINewCourt = Create &
  Pick<APICourt, 'basketCount' | 'image' | 'latitude' | 'longitude' | 'name' | 'texture'> & {
    status: Keyof<typeof statusType>
  }

export const statusType = {
  ACCEPT: '승인',
  DENY: '거절',
  READY: '대기',
} as const
