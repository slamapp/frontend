import type { APISend, OmitAt, APICreate, APIReceive } from "~/types/common"
import type { APIUser } from "~/types/domains"

export interface APIFollow extends APISend {
  receiver: OmitAt<APIUser>
}

export type APIFollowing = APIReceive
export type APIFollower = APICreate
