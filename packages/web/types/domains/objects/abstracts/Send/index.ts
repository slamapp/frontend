import type { APIUser } from "../../user"
import type Default from "../Default"

export default interface Send extends Default {
  sender: Pick<APIUser, "id" | "nickname" | "profileImage">
}
