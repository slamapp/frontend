import type {
  APIUsersChatroom,
  APICourtChatroom,
  APICourt,
  APIUser,
  OmitAt,
} from "@domainTypes/tobe";

interface Props<Type, Props> {
  type: Type;
  props: Props;
}

export type Option =
  | Props<"COURT", Pick<APICourt, "id" | "latitude" | "longitude" | "name">>
  | Props<"COURT_CHATROOM", OmitAt<APICourtChatroom>>
  | Props<"USERS_CHATROOM", OmitAt<APIUsersChatroom>>
  | Props<"USER", OmitAt<APIUser>>;
