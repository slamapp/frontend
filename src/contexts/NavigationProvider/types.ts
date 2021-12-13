import { PageType, PageTypeUnion } from "./actionTypes";

export interface EventsAvailableToSet {
  back?: null | ((...args: any[]) => void);
  next?: null | ((...args: any[]) => void);
}

export type GetPageType = (page: PageType) => PageTypeUnion;
