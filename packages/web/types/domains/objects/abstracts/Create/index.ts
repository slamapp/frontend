import type { APIUser } from "../../user"
import type Default from "../Default"

export default interface Create extends Default {
  creator: Pick<APIUser, "id" | "nickname" | "profileImage">
}
