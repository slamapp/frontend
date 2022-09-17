import type { APICommon, ISOString, OmitAt } from "~/types/common"
import type { APICourt } from "~/types/domains"

export interface APILoudspeaker extends APICommon {
  startTime: ISOString
  court: OmitAt<APICourt>
}
