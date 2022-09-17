import type { APICommon } from "~/types/common"
import type { APICourt } from "~/types/domains"

export interface APIFavorite extends APICommon {
  court: APICourt
}
