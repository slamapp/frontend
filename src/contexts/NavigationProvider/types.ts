import { pageType, eventType } from "./actionTypes";

export type PageType = typeof pageType;
export type PageTypeUnion = PageType[keyof PageType];
export type EventType = typeof eventType;
export type EventTypeUnion = EventType[keyof EventType];

export type ActionType = PageType & EventType;
export type ActionTypeUnion = ActionType[keyof ActionType];

export interface DataProps {
  isTopNavigation: boolean;
  isBottomNavigation: boolean;
  currentPage: PageTypeUnion;
  isBack: boolean;
  isNotifications: boolean;
  isProfile: boolean;
  isNext: boolean;
  isMenu: boolean;
  title: string;
  handleClickBack: null | (() => void);
  handleClickNext: null | (() => void);
}

interface EventsAvailableToSet {
  back: null | ((...args: any[]) => void);
  next: null | ((...args: any[]) => void);
}

export interface ContextProps {
  navigationProps: DataProps;
  pageType: PageType;
  useMountPage: (getPageType: (pageType: PageType) => PageTypeUnion) => void;
  setNavigationEvent: (events: EventsAvailableToSet) => void;
  clearNavigationEvent: () => void;
}

export type Action = {
  type: ActionTypeUnion;
  payload?: any;
};
