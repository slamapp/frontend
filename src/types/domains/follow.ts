import type { APISend, OmitAt } from "~/types/common"
import type { APIUser } from "~/types/domains"

export interface APIFollow extends APISend {
  receiver: OmitAt<APIUser>
}
