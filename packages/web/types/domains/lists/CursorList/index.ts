import type { Id } from "../../objects/abstracts"
import type List from "../List"

export default interface CursorList<T extends Id> extends List<T> {
  lastId: T["id"] | null
}

export type CursorListRequestOption<T extends Id> =
  | { isFirst: true; lastId: null; size?: number } // 첫 요청시
  | { isFirst: false; lastId: null; size?: number }
  | { isFirst: false; lastId: T["id"]; size?: number }
