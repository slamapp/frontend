import { createContext } from "react";
import { pageType } from "./actionTypes";
import { initialData } from "./reducer";
import { ContextProps } from "./types";

const initialContext = {
  navigationProps: initialData,
  pageType,
  useMountPage: () => {},
  setNavigationEvent: () => {},
  clearNavigationEvent: () => {},
  changeNavigation: () => {},
};

export const Context = createContext<ContextProps>(initialContext);
