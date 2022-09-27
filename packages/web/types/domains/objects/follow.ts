import type { OmitAt } from "../helpers"
import type { Create, Receive, Send } from "./abstracts"
import type { APIUser } from "./user"

export interface APIFollow extends Send {
  receiver: OmitAt<APIUser>
}

export type APIFollowing = Receive
export type APIFollower = Create
