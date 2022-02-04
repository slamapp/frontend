import type { MouseEvent, ReactElement } from "react";
import type {
  APICourt,
  APICourtChatroom,
  APIUser,
  APIUsersChatroom,
  OmitAt,
} from "@domainTypes/tobe";

export type Props =
  | CourtProps
  | CourtChatroomProps
  | UserChatroomProps
  | UserProps;

interface CourtProps extends DefaultProps {
  court: Pick<APICourt, "id" | "latitude" | "longitude" | "name">;
}
interface CourtChatroomProps extends DefaultProps {
  courtChatroom: OmitAt<APICourtChatroom>;
}
interface UserChatroomProps extends DefaultProps {
  usersChatroom: OmitAt<APIUsersChatroom>;
}
interface UserProps extends DefaultProps {
  user: OmitAt<APIUser>;
}

interface DefaultProps {
  bind: (handleClick: (event?: MouseEvent) => void) => ReactElement;
}
