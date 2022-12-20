import type { OmitAt } from "../helpers"
import type { Default } from "./abstracts"
import type { APICourt } from "./court"

export interface APILoudspeaker extends Default {
  startTime: string
  court: OmitAt<APICourt>
}
