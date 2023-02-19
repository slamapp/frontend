import type { APIUser } from './user'
import type { Create, OmitAt, Receive, Send } from '../abstracts'

export interface APIFollow extends Send {
  receiver: OmitAt<APIUser>
}

export type APIFollowing = Receive
export type APIFollower = Create
