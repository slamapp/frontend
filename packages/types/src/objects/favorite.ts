import type { APICourt } from './court'
import type { Default } from '../abstracts'

export interface APIFavorite extends Default {
  court: APICourt
}
