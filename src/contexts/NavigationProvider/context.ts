import { createContext } from "react";
import { PageType, pageType } from "./actionTypes";
import { DataProps, initialData } from "./reducer";
import { Events, GetPageType } from "./types";

export interface ContextProps {
  navigationProps: DataProps;
  pageType: PageType;
  useMountPage: (getPageType: GetPageType) => void;
  setNavigationEvent: (events: Events) => void;
  setCustomButtonEvent: (title: string, handleClick: any) => void;
  clearNavigationEvent: () => void;
  changeNavigation: (data: Partial<DataProps>) => void;
}

const initialContext = {
  navigationProps: initialData,
  pageType,
  useMountPage: () => {},
  setNavigationEvent: () => {},
  setCustomButtonEvent: () => {},
  clearNavigationEvent: () => {},
  changeNavigation: () => {},
};

const Context = createContext<ContextProps>(initialContext);

export default Context;
