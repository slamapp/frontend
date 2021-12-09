import { pageType, eventType, navigationType } from "./actionTypes";

export type PageType = typeof pageType;
export type PageTypeUnion = PageType[keyof PageType];
export type EventType = typeof eventType;
export type EventTypeUnion = EventType[keyof EventType];
export type NavigationType = typeof navigationType;
export type NavigationTypeUnion = NavigationType[keyof NavigationType];

export type ActionType = PageType & EventType & NavigationType;
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

export type GetPageType = (page: PageType) => PageTypeUnion;

interface EventsAvailableToSet {
  back?: null | ((...args: any[]) => void);
  next?: null | ((...args: any[]) => void);
}

export interface ContextProps {
  navigationProps: DataProps;
  pageType: PageType;
  useMountPage: (getPageType: (pageType: PageType) => PageTypeUnion) => void;
  setNavigationEvent: (events: EventsAvailableToSet) => void;
  clearNavigationEvent: () => void;
  changeNavigation: (data: Partial<DataProps>) => void;
}

export type ReducerAction = {
  type: ActionTypeUnion;
  payload?: any;
};
