import type { APICourt } from './court'
import type { Default, OmitAt } from '../abstracts'

export interface APILoudspeaker extends Default {
  startTime: string
  court: OmitAt<APICourt>
}
