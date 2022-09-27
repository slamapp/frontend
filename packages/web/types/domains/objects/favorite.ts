import type { Default } from "./abstracts"
import type { APICourt } from "./court"

export interface APIFavorite extends Default {
  court: APICourt
}
