import type { ReactElement, UIEvent } from "react";
import type {
  APICourt,
  APICourtChatroom,
  APIUser,
  APIUsersChatroom,
  OmitAt,
} from "@domainTypes/tobe";

export type ShareProps =
  | CourtProps
  | CourtChatroomProps
  | UserChatroomProps
  | UserProps;

type CourtProps = Props<{
  court: Pick<APICourt, "id" | "latitude" | "longitude" | "name">;
}>;
type CourtChatroomProps = Props<{
  courtChatroom: OmitAt<APICourtChatroom>;
}>;
type UserChatroomProps = Props<{
  usersChatroom: OmitAt<APIUsersChatroom>;
}>;
type UserProps = Props<{
  user: OmitAt<APIUser>;
}>;

type Props<T> = T & {
  type: keyof T;
  bind: (shareHandler: (e?: UIEvent<HTMLElement>) => void) => ReactElement;
};
