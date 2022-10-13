import type { ReactNode } from "react"
import type { ActionWithPayload, ActionWithoutPayload } from "~/contexts/type"
import type { Events } from "./types"

export type Action = EventAction | NavigationAction | PageAction

type EventAction =
  | ActionWithPayload<"EVENT_BIND", { events: Events }>
  | ActionWithPayload<
      "EVENT_BIND_CUSTOM_BUTTON",
      { title: ReactNode; handleClick: any }
    >
  | ActionWithoutPayload<"EVENT_CLEAR">

type NavigationAction =
  | ActionWithPayload<"NAVIGATION_SET_TITLE", { title: ReactNode }>
  | ActionWithPayload<"SET_TOP_NAV_IS_SHRINK", { isShrink: boolean }>

type PageAction =
  | ActionWithoutPayload<"PAGE_NONE">
  | ActionWithoutPayload<"PAGE_FAVORITES">
  | ActionWithoutPayload<"PAGE_LOGIN">
  | ActionWithoutPayload<"PAGE_MAP">
  | ActionWithoutPayload<"PAGE_RESERVATIONS">
  | ActionWithoutPayload<"PAGE_RESERVATIONS_COURTS">
  | ActionWithoutPayload<"PAGE_COURT_RESERVATIONS">
  | ActionWithoutPayload<"PAGE_ACTIVITY">
  | ActionWithoutPayload<"PAGE_COURT_CREATE">
  | ActionWithoutPayload<"PAGE_USER">
  | ActionWithoutPayload<"PAGE_USER_EDIT">
  | ActionWithoutPayload<"PAGE_USER_MENU">
  | ActionWithoutPayload<"PAGE_USER_FOLLOWING">
  | ActionWithoutPayload<"PAGE_USER_FOLLOWER">
  | ActionWithoutPayload<"PAGE_NOTIFICATIONS">
  | ActionWithoutPayload<"PAGE_CHATROOM_LIST">
  | ActionWithoutPayload<"PAGE_USER_CHATROOM">
  | ActionWithoutPayload<"PAGE_COURT_CHATROOM">
  | ActionWithoutPayload<"PAGE_ADMIN_NEWCOURTS">
  | ActionWithoutPayload<"PAGE_ERROR">

export type PageType = PageAction["type"]
