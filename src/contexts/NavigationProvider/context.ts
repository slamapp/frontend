import { createContext } from "react";
import { PageType, pageType } from "./actionTypes";
import { DataProps, initialData } from "./reducer";
import { EventsAvailableToSet, GetPageType } from "./types";

export interface ContextProps {
  navigationProps: DataProps;
  pageType: PageType;
  useMountPage: (getPageType: GetPageType) => void;
  setNavigationEvent: (events: EventsAvailableToSet) => void;
  clearNavigationEvent: () => void;
  changeNavigation: (data: Partial<DataProps>) => void;
}

const initialContext = {
  navigationProps: initialData,
  pageType,
  useMountPage: () => {},
  setNavigationEvent: () => {},
  clearNavigationEvent: () => {},
  changeNavigation: () => {},
};

export const Context = createContext<ContextProps>(initialContext);
