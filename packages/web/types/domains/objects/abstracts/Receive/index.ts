import type { APIUser } from "../../user"
import type Default from "../Default"

export default interface Receive extends Default {
  receiver: Pick<APIUser, "id" | "nickname" | "profileImage">
}
