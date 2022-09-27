import type { OmitAt } from "~/types/domains/helpers"
import type {
  APICourt,
  APICourtChatroom,
  APIUser,
} from "~/types/domains/objects"

export type ShareArgs = CourtArgs | CourtChatroomArgs | UserArgs

type CourtArgs = Args<{
  court: Pick<APICourt, "id" | "latitude" | "longitude" | "name">
}>
type CourtChatroomArgs = Args<{
  courtChatroom: OmitAt<APICourtChatroom>
}>
type UserArgs = Args<{
  user: OmitAt<APIUser>
}>

type Args<Obj> = {
  [Key in keyof Obj]: [Key, Obj]
}[keyof Obj]
