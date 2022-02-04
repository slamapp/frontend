import type {
  APICourt,
  APICourtChatroom,
  APIUser,
  APIUsersChatroom,
  OmitAt,
} from "@domainTypes/tobe";

export type Options =
  | CourtOptions
  | CourtChatroomOptions
  | UserChatroomOptions
  | UserOptions;

export interface CourtOptions extends DefaultOptions<"court"> {
  court: Pick<APICourt, "id" | "latitude" | "longitude" | "name">;
}

export interface CourtChatroomOptions extends DefaultOptions<"courtChatroom"> {
  courtChatroom: OmitAt<APICourtChatroom>;
}

export interface UserChatroomOptions extends DefaultOptions<"usersChatroom"> {
  usersChatroom: OmitAt<APIUsersChatroom>;
}

export interface UserOptions extends DefaultOptions<"user"> {
  user: OmitAt<APIUser>;
}

interface DefaultOptions<T> {
  type: T;
}
