import { PageType, PageTypeUnion } from "./actionTypes";

export interface Events {
  back: null | ((...args: any[]) => void | Promise<any>);
  customButton: CustomButton;
}

export type CustomButton = null | {
  title: string;
  handleClick: (...args: any[]) => void | Promise<any>;
};

export type GetPageType = (page: PageType) => PageTypeUnion;

interface EventsAvailableToSet {
  back?: null | ((...args: any[]) => void);
  next?: null | ((...args: any[]) => void);
}

export interface ContextProps {
  navigationProps: DataProps;
  pageType: PageType;
  useMountPage: (getPageType: (pageType: PageType) => PageTypeUnion) => void;
  useMountLinkNavigationEvent: (events: EventsAvailableToSet) => void;
}

export type ReducerAction = {
  type: ActionTypeUnion;
  payload?: any;
};
