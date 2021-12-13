export const eventType = {
  BIND: "BIND",
  CLEAR: "CLEAR",
} as const;

export const pageType = {
  NONE: "NONE",
  FAVORITES: "FAVORITES",
  LOGIN: "LOGIN",
  MAP: "MAP",
  RESERVATIONS: "RESERVATIONS",
  ACTIVITY: "ACTIVITY",
  COURT_CREATE: "COURT_CREATE",
  USER: "USER",
  USER_MENU: "USER_MENU",
  USER_EDIT: "USER_EDIT",
  USER_FOLLOWING: "USER_FOLLOWING",
  USER_FOLLOWER: "USER_FOLLOWER",
  NOTIFICATIONS: "NOTIFICATIONS",
  CHATROOM: "CHATROOM",
  USER_CHATROOM: "USER_CHATROOM",
  COURT_CHATROOM: "COURT_CHATROOM",
} as const;

export const navigationType = {
  CHANGE_NAVIGATION: "CHANGE_NAVIGATION",
} as const;

export type PageType = typeof pageType;
export type PageTypeUnion = PageType[keyof PageType];
export type EventType = typeof eventType;
export type EventTypeUnion = EventType[keyof EventType];
export type NavigationType = typeof navigationType;
export type NavigationTypeUnion = NavigationType[keyof NavigationType];

export type ActionType = PageType & EventType & NavigationType;
export type ActionTypeUnion = ActionType[keyof ActionType];
