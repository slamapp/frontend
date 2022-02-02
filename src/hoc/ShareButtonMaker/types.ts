import type {
  APIUsersChatroom,
  APICourtChatroom,
  APICourt,
  APIUser,
  OmitAt,
} from "@domainTypes/tobe";

interface Props<Type, Payload> {
  type: Type;
  payload: Payload;
}

export type HOCProps =
  | Props<"COURT", Pick<APICourt, "id" | "latitude" | "longitude" | "name">>
  | Props<"COURT_CHATROOM", OmitAt<APICourtChatroom>>
  | Props<"USERS_CHATROOM", OmitAt<APIUsersChatroom>>
  | Props<"USER", OmitAt<APIUser>>;

export type GetProps<T extends HOCProps["type"]> = Extract<
  HOCProps,
  { type: T }
>["payload"];
